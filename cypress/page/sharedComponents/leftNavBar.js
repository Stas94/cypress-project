export class LeftNavBar {
  selectors = {
    genericNavItem: (itemName) => cy.contains('[class*="sidebar"] a', itemName),
  };

  clickNavItem(itemName) {
    this.selectors.genericNavItem(itemName).should("be.visible").click();
  }
}
