import { GaragePage, BaseModal, LeftNavBar, FuelExpensesPage } from "../page";
import { faker } from "@faker-js/faker";

const baseModal = new BaseModal();
const garaPage = new GaragePage();
const fuelExpensesPage = new FuelExpensesPage();
const leftNavBar = new LeftNavBar();
const registeredEmail = faker.internet.email({ provider: "example.com" });
const registerPassword = faker.internet.password();

describe("Registration modal", () => {
  beforeEach(function () {
    cy.fixture("users").then(({ admin, userWithoutPasswordAndEmail }) => {
      this.userWithoutPasswordAndEmail = userWithoutPasswordAndEmail;
      cy.visit("/", {
        auth: { username: admin.name, password: admin.password },
      });
    });
    cy.fixture("garageCar").then(({ bmvX5 }) => {
      this.bmvX5 = bmvX5;
    });
  });

  it("Add car", function () {
    cy.registr(
      this.userWithoutPasswordAndEmail.name,
      this.userWithoutPasswordAndEmail.lastname,
      registeredEmail,
      registerPassword,
    );
    garaPage.checkGarageTitle("Garage");
    garaPage.clickButtonAddCar();
    baseModal.checkModalTitle("Add a car");
    baseModal.selectors.modalContent().within(() => {
      garaPage.selectBrand(this.bmvX5.brand);
      garaPage.selectModel(this.bmvX5.model);
      garaPage.fillMileage(this.bmvX5.mileage);
      garaPage.clickButtonAdd("Add");
    });
    baseModal.checkSuccessMessage("Car added");
  });

  it("Add Fuel expenses", function () {
    cy.login(registeredEmail, registerPassword);
    leftNavBar.clickNavItem("Fuel expenses");
    fuelExpensesPage.checkFuelExpensesTitle("Fuel expenses");
    fuelExpensesPage.clickButtonAddAnExpense();
    baseModal.checkModalTitle("Add an expense");
    baseModal.selectors.modalContent().within(() => {
      fuelExpensesPage.checkVenicle(this.bmvX5.brand + " " + this.bmvX5.model);
      fuelExpensesPage.fillMileage("151000");
      fuelExpensesPage.fillNumberOfLiters(10);
      fuelExpensesPage.fillTotalCost(100);
      fuelExpensesPage.clickButtonAdd();
    });
    baseModal.checkSuccessMessage("Fuel expense added");
  });
});
