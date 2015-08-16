var allPermissions = {}

function getAuthorizedSites() {
    chrome.permissions.getAll( function (permissions) {
        allPermissions = permissions;
    });
}

function showAuthorizedSites() {
    chrome.permissions.getAll( function (permissions) {
        allPermissions = permissions;
        $.each(permissions.origins, function (key, value) {
            if (value == "https://gist.github.com/*" || value == "https://github.com/*") {
                var newItem = $("<li id=\"new_auth_url_" + key + "\">\
                  <strong>" + value + "</strong>\
                </li>");
            newItem.find("input").click(function() {
                    removeAuthorizedSite(key, value);
                });
            } else {
                var newItem = $("<li id=\"new_auth_url_" + key + "\">\
                        <div>\
                          <input id=\"unauth_url_submit" + key + "\" class=\"btn btn-sm btn-danger\" type=\"submit\" value=\"Unauthorize\">\
                        </div>\
                      <strong>" + value + "</strong>\
                    </li>");
                newItem.find("input").click(function() {
                        removeAuthorizedSite(key, value);
                    });
            }
            $("#new_auth_url_item").before(newItem);
        });
    });
}

function addAuthorizedSite() {
    var newURL = $("#new_auth_url").val();
    chrome.permissions.contains({
        origins: [newURL]
    }, function(result) {
        if (result) {
            // The extension has the permissions already.
            $("li:contains(" + newURL + ")").addClass("highlight")
               .delay(4500)
               .queue(function() {
                   $(this).removeClass("highlight");
                   $(this).dequeue();
               });
        } else {
            // The extension doesn't have the permissions.s
            chrome.permissions.request({
                  origins: [newURL]
                }, function (granted) {
                if (granted) {
                    getAuthorizedSites();
                    var new_auth_url_id = allPermissions.origins.length;
                    //saveOptions()
                    var newItem = $("<li id=\"new_auth_url_" + new_auth_url_id + "\">\
                            <div>\
                              <input id=\"unauth_url_submit" + new_auth_url_id + "\" class=\"btn btn-sm btn-danger\" type=\"submit\" value=\"Unauthorize\">\
                            </div>\
                          <strong>" + newURL + "</strong>\
                        </li>");
                    newItem.find("input").click(function() {
                            removeAuthorizedSite(new_auth_url_id, newURL);
                        });
                    $("#new_auth_url_item").before(newItem);
                    $("#new_auth_url").val("");
                } else {
                    // permissions not granted (by user or error)
                    var lastError = chrome.runtime.lastError;
                    if (lastError) {
                        console.log(lastError.message);
                        alert(lastError.message);
                    }
                }
            });
        }
    });
}

function removeAuthorizedSite(id, URL) {
    console.debug(id);
    console.debug(URL);
    var r = confirm("Really remove " + URL + "?");
    if (r) {
        chrome.permissions.contains({
            origins: [URL]
        }, function(result) {
            if (result) {
                // The extension has the permissions.
                chrome.permissions.remove({
                    origins: [URL]
                    }, function(removed) {
                    if (removed) {
                        // The permissions have been removed.
                        $("#new_auth_url_" + id).remove();
                    } else {
                        // The permissions have not been removed (e.g., you tried to remove
                        // required permissions).
                        alert("Required permissions cannot be removed.")
                    }
                });
            } else {
              // The extension doesn't have the permissions.
              console.debug("not found");
            }
        });
    }
}

function setupUI() {
    showAuthorizedSites();
    $("#new_auth_url_submit").click(addAuthorizedSite);
}

document.addEventListener('DOMContentLoaded', setupUI);