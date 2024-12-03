describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    cy.url().should("include", "/login");
  });

  it("should display the login page elements", () => {
    cy.contains("h1", "Intra in contul tau").should("be.visible");
    cy.get('input[id="email"]').should("be.visible");
    cy.get('input[id="password"]').should("be.visible");
    cy.contains("button", "Autentificare").should("be.visible");
  });

  it("should display an error for invalid input", () => {
    cy.get('button[type="submit"]').click();
    cy.get('div[id="errorMessage"]').should("be.visible").and("contain", "Email sau parola invalida!");
  });

  it("should display an error for invalid credentials", () => {
    cy.get('input[id="email"]').type("invalid@example.com");
    cy.get('input[id="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.get('div[id="errorMessage"]').should("be.visible").and("contain", "Email sau parola invalida!");
  });

  it("should allow valid login", () => {
    cy.get('input[id="email"]').type("dorin.birsan@student.usv.ro");
    cy.get('input[id="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/student/exams");
  });
});
