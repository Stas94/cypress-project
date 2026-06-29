import { GaragePage, BaseModal } from "../page";
import { UserApi } from "../api/users";
import { CarsApi } from "../api/cars";
import { ExpensesPage } from "../page/expenses";

const baseModal = new BaseModal();
const garaPage = new GaragePage();
const userApi = new UserApi();
const carsApi = new CarsApi();
const expensesPage = new ExpensesPage();

let user;
let admin;
let expenseData;
let date;

describe("Garage and Expenses Tests", () => {
  before(function () {
    date = new Date();
    cy.fixture("users").then(({ admin: adminData, user2 }) => {
      user = user2;
      admin = adminData;
      cy.visit("/", {
        auth: { username: admin.name, password: admin.password },
      });
      userApi.createUser(user).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
    cy.fixture("garageCar").then(({ bmvX5 }) => {
      this.bmvX5 = bmvX5;
    });
  });

  after(function () {
    userApi.deleteUser().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Add car", function () {
    cy.intercept("POST", "/api/cars").as("createCar");
    cy.login(user.email, user.password);
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
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);

      const carId = interception.response.body.data.id;
      cy.wrap(carId).as('createdCarId');
    });
    carsApi.getCars().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].id).to.eq(this.createdCarId);
      expect(response.body.data[0].brand).to.eq(this.bmvX5.brand);
      expect(response.body.data[0].model).to.eq(this.bmvX5.model);
      expect(response.body.data[0].mileage).to.eq(Number(this.bmvX5.mileage));
    });
  });


  // old test for adding fuel expenses through UI
  // it("Add Fuel expenses", function () {
  //   cy.login(this.user2.email, this.user2.password);
  //   leftNavBar.clickNavItem("Fuel expenses");
  //   fuelExpensesPage.checkFuelExpensesTitle("Fuel expenses");
  //   fuelExpensesPage.clickButtonAddAnExpense();
  //   baseModal.checkModalTitle("Add an expense");
  //   baseModal.selectors.modalContent().within(() => {
  //     fuelExpensesPage.checkVenicle(this.bmvX5.brand + " " + this.bmvX5.model);
  //     fuelExpensesPage.fillMileage("151000");
  //     fuelExpensesPage.fillNumberOfLiters(10);
  //     fuelExpensesPage.fillTotalCost(100);
  //     fuelExpensesPage.clickButtonAdd();
  //   });
  //   baseModal.checkSuccessMessage("Fuel expense added");
  // });

  it("Add Fuel expenses via API", function () {
    expenseData = {
      carId: this.createdCarId,
      reportedAt: date,
      mileage: 151000,
      liters: 50,
      totalCost: 1000,
      forceMileage: false,
    };
    cy.visit("/", {
      auth: { username: admin.name, password: admin.password },
    });
    cy.login(user.email, user.password);
    cy.addExpense(expenseData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.reportedAt).to.eq(date.toISOString());
      expect(response.body.data.carId).to.eq(this.createdCarId);
      expect(response.body.data.mileage).to.eq(Number(expenseData.mileage));
      expect(response.body.data.liters).to.eq(Number(expenseData.liters));
      expect(response.body.data.totalCost).to.eq(Number(expenseData.totalCost));
    });
  });

  it("Check Fuel expenses in UI", function () {
    cy.visit("/", {
      auth: { username: admin.name, password: admin.password },
    });
    cy.login(user.email, user.password);
    expensesPage.leftNavBar.clickNavItem("Fuel expenses");
    expensesPage.checkFuelExpensesTitle("Fuel expenses");
    expensesPage.checkExpenseInTable(expenseData);
  });
});
