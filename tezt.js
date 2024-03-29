"use strict"

let categories = [
    {
        name: "Information",
        content: [
            {
                header: "Update Log",
                preText: updateLog,
                sectionHtml: `<div class="section-content"><span class="text-description">You can read the entire <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/blob/master/Update%20log.md">Update Log</a> on the github page for DashBlox.</span></div>`
            },
            {
                header: "Social Media (13+)",
                sectionHtml: `<div class="section-content"><a class="icon-social-media-discord" target="_blank" href="https://discord.gg/D2wqedQpTx" style="background-position: -6.5px -8px;"></a><a class="icon-social-media-discord" target="_blank" href="https://twitter.com/WingedDash" style="background-position: -6.5px -134px;"></a><a class="icon-social-media-discord" target="_blank" href="https://github.com/WingedDash" style="background-position: -6.5px -327px;"></a><a class="icon-social-media-discord" target="_blank" href="https://www.roblox.com/users/531629183/profile" style="background-position: -6.5px -455px;"></a></div>`
            },
            {
                header: "Multiple Extensions",
                text: `Multiple extensions can cause problems with DashBlox, such as the Robux logos not working and possible duplication in some areas, make sure that you have properly configured all of your settings in all of your extensions so that it doesn't cause any problems with DashBlox.`
            },
            {
                header: "Report A Bug",
                sectionHtml: `</div><div class="section-content"><span class="text-description">Did you find a bug and want to report it? You can report it <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/issues">here</a>.</span>`
            },
            {
                header: "Privacy Policy",
                sectionHtml: `</div><div class="section-content"><span class="text-description">You can read the <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/blob/master/Privacy%20Policy.md">Privacy Policy</a> to see how your data is being used and more.</span>`
            }
        ]
    },
    {
        name: "General",
        content: [
            {
                header: "Catalog",
                options: [
                    {
                        header: "Time Format",
                        text: "Decides which type of format your prefer it to be in.",

                        toggleable: true,
                        disabled: false,
                        setting: "general.simpleTimeFormat"
                    }
                ]
            },
            {
                header: "Games",
                options: [
                    {
                        header: "Popular tab back on the top of the page",
                        text: "When looking for games, the popular tab will be at the very top of the page.",

                        toggleable: true,
                        disabled: false,
                        setting: "general.popularTabTop"
                    }
                ]
            }
        ]
    },
    {
        name: "Catalog",
        content: [
            {
                header: "Assets",
                options: [
                    {
                        header: "Item statistics",
                        text: "Get certain statistics about an item on the catalog or library.",

                        toggleable: true,
                        disabled: false,
                        setting: "assets.assetStats"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Owners list",
                        text: "View the owners of a item that is either something you created or a limited.",

                        toggleable: true,
                        disabled: true,
                        setting: "assets.ownersList"
                    }
                ]
            }
        ]
    },
    {
        name: "Profile",
        content: [
            {
                header: "Information",
                options: [
                    {
                        header: "Profile statuses",
                        text: "Allows you to see profile statuses.",

                        toggleable: true,
                        disabled: false,
                        setting: "profile.profileStatus"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Last Online",
                        text: "View when a user was last online on their profile.",

                        toggleable: true,
                        disabled: false,
                        setting: "profile.lastOnline"
                    }
                ]
            },
            {
                header: "Aesthetic",
                options: [
                    {
                        header: "Easy to view statistics",
                        text: "Moves the profile information such as join date under the avatar.",

                        toggleable: true,
                        disabled: false,
                        setting: "profile.easyStatistics"
                    }
                ]
            }
        ]
    },
    {
        name: "Themes",
        content: [
            {
                header: "Aesthetic",
                options: [
                    {
                        header: "Original topbar",
                        text: `Replaces the top bar text with "games" and "catalog".`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.oldTopBarText"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Old Robux icons",
                        text: "Replaces the new Robux icon with the older one.",

                        toggleable: true,
                        disabled: false,
                        setting: "theme.oldRobuxIcons"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Experiences to games",
                        text: `Reverts "experiences" back to "games" as it originally was.`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.changeBackToGames"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Better scrollbar",
                        text: `Makes the scrollbar more modern and work with the theme.`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.fancyScrollBar"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Small chat tab",
                        text: `Changes the chat tab to be smaller.`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.smallChatTab"
                    }
                ]
            }
        ]
    }
]

pages.settings = () => {
    var settingsCooldown = false;
    var selectedCategory = "";

  /*  $.watch("body", (body) => {
        body.addClass('modern-ui');
    })*/

    function getCategory(name) {
        for (let index in categories) {
            let category = categories[index];

            if (String(category.name).toLowerCase() == String(name).toLowerCase()) {
                return category;
            }
        }
        throw new Error(`Could not find category under the name ${name}`);
    }

    function getSetting(setting) {
        let settingCategories = setting.split(".");

        return [settings.get(settingCategories[0], settingCategories[1]), settingCategories];
    }

    function loadCategory(name) {
        if (!settingsCooldown && name != selectedCategory) {
            settingsCooldown = true;

            let category = getCategory(name);

            let previousCategoryElement = $(`.category-${String(selectedCategory).toLowerCase()}`);
            let categoryElement = $(`.category-${String(category.name).toLowerCase()}`);

            previousCategoryElement.removeClass("active");
            categoryElement.addClass("active");

            $(".dashblox-settings-content").empty();

            category.content.forEach((categroyContent) => {
                let section = $(`<div class="section"></div>`).appendTo(".dashblox-settings-content");

                if (categroyContent.header) {
                    section.append(`<div class="container-header"><h3>${categroyContent.header}</h3></div>`);
                }

                if (categroyContent.preText) {
                    section.append(`</div><div class="section-content"><pre class="text-description">${categroyContent.preText}</pre>`);
                }

                if (categroyContent.text) {
                    section.append(`</div><div class="section-content"><span class="text-description">${categroyContent.text}</span>`);
                }

                if (categroyContent.options) {
                    let sectionContent = $(`</div><div class="section-content"></div>`).appendTo(section);

                    categroyContent.options.forEach((option, index) => {
                        if (option.header && option.text) {
                            sectionContent.append(`<span class="text-lead">${option.header}</span>`);
                            sectionContent.append(`<div class="rbx-divider"></div>`);
                            sectionContent.append(`<span class="text-description">${option.text}</span>`);
                        } else {
                            if (options.length < index) {
                                sectionContent.append(`<div class="rbx-divider"></div>`);
                            }

                            if (option.header) {
                                sectionContent.append(`<span class="text-lead">${option.header}</span>`);
                            }

                            if (option.text) {
                                sectionContent.append(`<span class="text-description">${option.text}</span>`);
                            }
                        }

                        if (option.toggleable) {
                            let getSettingOptions = getSetting(option.setting);
                            let setting = getSettingOptions[0];

                            let toggle = $(`<button id="btn-toggle" class="btn-toggle ${option.disabled ? "disabled" : setting ? "on" : ""}"><span class="toggle-flip"></span><span id="toggle-on" class="toggle-on"></span><span id="toggle-off" class="toggle-off"></span></button>`).prependTo(sectionContent);

                            let toggleCoolDown = false;

                            toggle.click(() => {
                                let getSettingOptions = getSetting(option.setting);
                                let setting = getSettingOptions[0];
                                let categories = getSettingOptions[1];

                                if (!toggleCoolDown) {
                                    toggleCoolDown = true;

                                    if (!option.disabled) {
                                        if (setting) {
                                            settings.set(categories[0], categories[1], false);
                                            toggle.removeClass("on");
                                        } else {
                                            settings.set(categories[0], categories[1], true);
                                            toggle.addClass("on");
                                        }
                                    }

                                    toggleCoolDown = false;
                                }
                            })
                        }
                    })
                }

                if (categroyContent.sectionHtml) {
                    section.append(categroyContent.sectionHtml);
                }
            })

            selectedCategory = name;
            settingsCooldown = false;
        }
    }

    $.watch("head", () => {
        injectCSS("css/pages/settings.css");
    })


    $.watch(".smscMain ", (content) => { //smscMain  was .content
        content.empty();

        $("title")[0].text = "Settings - RoSmart";
        jQuery("link[rel='icon']").attr("href", chrome.extension.getURL("images/logo.png"));
        $("head").append("<link rel='stylesheet' href='https://css.rbxcdn.com/5c64a63aaffe7dc3a9bab865989c26fc1a2d25046a5d1dc2b47a02ce3e2f6108.css' />");
        $("head").append("<link rel='stylesheet' href='https://static4.smart-school.net/smsc/resources/jqueryui/1.12.1/jquery-ui.min.rev-36f743ce14.css' />");
        $("head").append("<link rel='stylesheet' href='https://static6.smart-school.net/production/Topnav/main.rev-38916dbfab.css' />");
        $("head").append("<link rel='stylesheet' href='https://static6.smart-school.net/modules/Profile/dist/main-built.rev-66ba9f1210.css' />");
        //jQuery("link[rel='stylesheet']").attr("href", "https://static6.smart-school.net/modules/Homepage/dist/main-built.rev-6a264919c6.css");
        $("body").ready(async () => {
            var RobloxMenuButton = $("body");
            RobloxMenuButton.prepend(`<header id="smscTopContainer" class="smsc-topnav"></header>`);
        })

        $("header").ready(async () => {
            var RobloxMenuButton = $("header");
            RobloxMenuButton.append(`<nav class="topnav">
            <div data-profile="" class="topnav__btn-wrapper">
                <button class="js-btn-profile topnav__btn topnav__btn--profile" aria-haspopup="true" aria-expanded="false">
                    <img src="https://userpicture20.smartschool.be/User/Userimage/hashimage/hash/521_bc04881e-98e7-4173-8b76-02d65f5b0408/plain/1/res/48" alt="Profiel afbeelding">
                    <div class="hlp-vert-box">
                        <span>Milan Devey</span>
                        <span class="topnav__btn__light"></span>
                    </div>
                    <div class="topnav__menu-arrow" aria-hidden="true"></div>
                </button></nav>`);
        }) 

        $("body").ready(async () => {
            var diving = $("body");
            diving.append(`<div id="smscMain" class="smscMain " tabindex="-1"></div>`)
        })
        
        $("#smscMain").ready(async () => {
            var ye = $("#smscMain");
            ye.append(`<div id="smscMainBlockContainer" class="center cf margin-top--milli">
            <div class="smscFrameTitleContainer">
                <span class="smscFrameTitle">Profiel</span>
            </div>
            <div id="smscMainBlockContainerContent">
                <div class="smscSettings">
                    <a class="smscSettings_backbutton" href="/index.php?module=Homepage"></a>
                    <div class="smscSettings_mainTitle">Mijn profiel</div>
                    <div>Wijzig hier uw persoonlijke instellingen.</div>
                </div>
                <div>
                    <div class="smscAdminNav_body cf">
                    <div class="tab-content rbx-tab-content">
        <div class="tab-pane active" id="text"> <li class="list-item item-card">
        <div class="item-card-container">
          <a href="#" class="item-card-link">
            <div class="item-card-thumb-container">
             <span class="item-serial-number">milon</span>
              <img class="item-card-thumb" src="snow.png" />
              <span class="xsmall item-expire-time-label" id="xmas">Exp: 21 Days 22: 28: 40</span>
            </div>
            <div class="text-overflow item-card-name">Snowman</div>
          </a>
          <div class="text-overflow item-card-creator">
            <span class="xsmall text-label">By</span>
            <a class="xsmall text-overflow text-link" href="#"> milon </a>
          </div>
          <div class="item-card-price">
            <span class="icon-robux-16x16"></span>
            <span class="text-robux">robux: 3</span>
          </div>
        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>`);
        })
       

/*
$(".hlp-horiz-box").ready(async () => {
  var RobloxMenuButton = $(".hlp-horiz-box");
  RobloxMenuButton.prepend(`<div class="js-course-filters course-btnbar" aria-busy=false><input id=coursesFilter_own type=radio name=coursesFilter value=own checked> <label class="course-ico course-ico--own" for=coursesFilter_own title=Vakken>Vakken</label></div>`);
})*/
        

       /* content.append(`
        <sl-button type="warning">Warning</sl-button>
        <div id="dashblox-settings">
            <h1>DashBlox Settings</h1>
            
            <div class="menu-vertical-container">
                <ul id="vertical-menu" class="menu-vertical submenus">

                </ul>
            </div>

        <div class="dashblox-settings-content">

        </div>

        </div>`);*/

        categories.forEach((category) => {
            $("#vertical-menu.menu-vertical.submenus").append(`
            <li class="menu-option category-${String(category.name).toLowerCase()}">
                <a class="menu-option-content">
                    <span class="menu-text">${category.name}</span>
                </a>
            </li>`);
            
            $(`.category-${String(category.name).toLowerCase()}`).click(()=> {
                loadCategory(category.name);
            });
        })

        loadCategory("Information");
    })
}
