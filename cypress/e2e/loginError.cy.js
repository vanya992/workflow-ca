describe("Error Logging in", () => {
  it("should deny access to the user with wrong password", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(1000);
    cy.get("#loginForm").should("be.visible");
    cy.get("#loginEmail").type("vladmi@noroff.no");
    cy.get("#loginPassword").type("test");
    cy.get("button[type=submit]").contains("Login").click();
    cy.wait(1000);
  });

  it("should deny access to the user with wrong email", () => {
    cy.visit("./index.html");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(1000);
    cy.get("#loginForm").should("be.visible");
    cy.get("#loginEmail").type("testing@invalid");
    cy.get("button[type=submit]").contains("Login").click();
    cy.get("#loginEmail:invalid").should("exist");
    cy.wait(1000);
  });

  it("should deny access if the fields are empty", () => {
    cy.visit("./index.html");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(1000);
    cy.get("#loginForm").should("be.visible");
    cy.get("#loginEmail").type("{enter}");
    cy.get("#loginPassword").type("{enter}");
    cy.get("button[type=submit]").contains("Login").click();
    cy.get("#loginEmail:invalid").should("exist");
    cy.wait(1000);
  });
});
