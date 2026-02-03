export default async function ({ addon }) {
  const avatarWrapper = await addon.tab.waitForElement(".avatar-wrapper");
  avatarWrapper.classList.add("avatar-badge-wrapper");
  avatarWrapper.firstElementChild.classList.add("avatar-badge");
  avatarWrapper.title = "Decorated by Scratch Addons";

  if (/https\:\/\/scratch.mit.edu\/users\/.+\//.test(location.href)) {
    const badge = document.createElement("img");
    badge.src =
      "//cdn.scratch.mit.edu/scratchr2/static/__da70381f846683102550a800dc50ce22__/membership/membership-badge.svg";
    badge.style.setProperty("opacity", 0.6);
    badge.title = "Added by Scratch Addons";
    (await addon.tab.waitForElement("#profile-data > .box-head")).appendChild(badge);
  }
}
