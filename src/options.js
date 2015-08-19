var allPermissions = {}
var extOptions     = {}

function getAuthorizedSites() {
    chrome.permissions.getAll( function (permissions) {
        allPermissions = permissions;
    });
}

function showAuthorizedSites() {
    chrome.permissions.getAll( function (permissions) {
        allPermissions = permissions;
        chrome.storage.sync.get({
            public_gist_enabled: true,
            public_github_enabled: true
        },
        function(options) {
            extOptions = options;
            $.each(permissions.origins, function (key, value) {
                if (value == "https://gist.github.com/*" || value == "https://github.com/*") {
                    // check options and set buttong
                    var newItem = $("<li id=\"new_auth_url_" + key + "\">\
                            <div>\
                              <input id=\"unauth_url_submit" + key + "\" class=\"btn btn-sm btn-danger\" type=\"submit\" value=\"Disable\">\
                            </div>\
                            <strong>" + value + "</strong>\
                        </li>");
                    if (value == "https://gist.github.com/*" && !extOptions.public_gist_enabled) {
                        console.debug(value + " " + extOptions.public_gist_enabled);
                        newItem.find("input")
                            .removeClass("btn-danger")
                            .addClass("btn-primary")
                            .val("Enable")
                            .click(function() {
                                addAuthorizedSite(key, value);
                            });
                    } else if (value == "https://github.com/*" && !extOptions.public_github_enabled) {
                        console.debug(value + " " + extOptions.public_gist_enabled);
                        newItem.find("input")
                            .removeClass("btn-danger")
                            .addClass("btn-primary")
                            .val("Enable")
                            .click(function() {
                                addAuthorizedSite(key, value);
                            });
                    } else {
                        newItem.find("input").click(function() {
                            removeAuthorizedSite(key, value);
                        });
                    }
                    $("#permissions").prepend(newItem);
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
                    $("#new_auth_url_item").before(newItem);
                }
            });
        });
    });
}

function addAuthorizedSite(id, URL) {
    console.debug(id + " " + URL);
    if (id != undefined && URL != undefined) {
        if (URL == "https://gist.github.com/*") {
            chrome.storage.sync.set({ public_gist_enabled: true });
            $("#new_auth_url_" + id)
                .find("input")
                .removeClass("btn-primary")
                .addClass("btn-danger")
                .val("Disable")
                .unbind("click")
                .click(function() {
                    removeAuthorizedSite(id, URL);
                });
        } else if (URL == "https://github.com/*") {
            chrome.storage.sync.set({ public_github_enabled: true });
            $("#new_auth_url_" + id)
                .find("input")
                .removeClass("btn-primary")
                .addClass("btn-danger")
                .val("Disable")
                .unbind("click")
                .click(function() {
                    removeAuthorizedSite(id, URL);
                });
        }
    } else {
        var newURL = $("#new_auth_url").val().trim();
        if (newURL != '') {
            if (newURL.slice(-2) != '/*') newURL = newURL + '/*'
            if (newURL.slice(-1) === '/') newURL = newURL + '*'
        }
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
                $("#new_auth_url_msg").text("Duplicate URL - " + newURL);
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
                        $("#new_auth_url_submit").prop('disabled', true);
                        $("#new_auth_url_msg").text("");
                    } else {
                        // permissions not granted (by user or error)
                        var lastError = chrome.runtime.lastError;
                        if (lastError) {
                            console.log(lastError.message);
                            $("#new_auth_url_msg").text(lastError.message);
                        }
                    }
                });
            }
        });
    }
}

function removeAuthorizedSite(id, URL) {
    //console.debug(id);
    //console.debug(URL);
    var r = confirm("Really remove/disable " + URL + "?");
    if (r) {
        chrome.permissions.contains({
            origins: [URL]
        }, function(result) {
            if (result) {
                // The extension has the permissions.
                if (URL == "https://gist.github.com/*") {
                    chrome.storage.sync.set({ public_gist_enabled: false });
                    $("#new_auth_url_" + id)
                        .find("input")
                        .removeClass("btn-danger")
                        .addClass("btn-primary")
                        .val("Enable")
                        .unbind("click")
                        .bind('click', function() {
                            addAuthorizedSite(id, URL);
                        });
                } else if (URL == "https://github.com/*") {
                    chrome.storage.sync.set({ public_github_enabled: false });
                    $("#new_auth_url_" + id)
                        .find("input")
                        .removeClass("btn-danger")
                        .addClass("btn-primary")
                        .val("Enable")
                        .unbind("click")
                        .bind('click', function() {
                            addAuthorizedSite(id, URL);
                        });
                } else {
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
                }
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
    $("#new_auth_url").keyup( function () {
        if($(this).val() == '' ) {
            $("#new_auth_url_submit").prop("disabled", true);
        } else {
            $("#new_auth_url_submit").prop("disabled", false);
        }
    });
}

document.addEventListener('DOMContentLoaded', setupUI);