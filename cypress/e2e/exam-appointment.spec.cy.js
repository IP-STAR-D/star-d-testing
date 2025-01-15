describe("End-to-End Exam Appointment Test", () => {
  const studentEmail = "dorin.birsan@student.usv.ro";
  const professorEmail = "alexito.olar@gmail.com";
  const password = "default_password";
  const examName = "Examen Test";
  const shortExamName = "ET";

  beforeEach(() => {
    cy.visit("http://localhost:4200");
    cy.url().should("include", "/login");
  });

  it("should create and reject an exam appointment", () => {
    // Step 1: Log in as student
    cy.get('input[id="email"]').type(studentEmail);
    cy.get('input[id="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/student/exams");

    // Step 2: Click the "Examen Test" card
    cy.contains("mat-card", "Examen Test").click();

    // Step 3: Fill in the appointment form and submit it
    cy.get('input[name="selected_date"]').clear().type("1/31/2025").blur();

    cy.get('input[name="selected_time_start"]').click();
    cy.get("ngx-mat-timepicker-content button").contains("10").click(); // Select hour
    cy.get("span.mdc-button__label").contains("OK").click();

    cy.get('input[name="selected_time_end"]').click();
    cy.get("ngx-mat-timepicker-content button").contains("11").click(); // Select hour
    cy.get("span.mdc-button__label").contains("OK").click();

    cy.get('mat-select[name="selected_classroom"]').click();
    cy.get("mat-option").first().click();

    cy.get('button[type="submit"]').click();

    cy.contains("Programarea a fost creata.", { timeout: 10000 });
    cy.get("button").contains("Inchide").click();

    // Step 4: Log out
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/login");

    // Step 5: Log in as professor
    cy.get('input[id="email"]').type(professorEmail);
    cy.get('input[id="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/professor/appointments");

    cy.wait(2500);

    // Step 6: Reject the appointment for "Examen Test"
    cy.get("mat-card").each(($card) => {
      const cardText = $card.text();

      if (
        cardText.includes(shortExamName + " 3142") &&
        cardText.includes("IN ASTEPTARE") &&
        cardText.includes("31.01.2025")
      ) {
        cy.wrap($card).click();
        return false;
      }
    });

    cy.contains("button", "Respinge").click();

    cy.contains("Am modificat cererea!", { timeout: 10000 });
  });
});
