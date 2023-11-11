describe("Logout button", () => {
  it("should login user and than log out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.get("#loginForm").should("be.visible");
    cy.wait(1000);
    cy.get("#loginEmail").type("vladmi@noroff.no");
    cy.get("#loginPassword").type("password123");
    cy.get("button[type=submit]").contains("Login").click();
    cy.location("href").should("include", "view=profile&name");

    cy.get("button[data-auth=logout]").contains("Logout").click();
    cy.wait(2000);
    cy.getAllLocalStorage().should("be.empty");
  });
});
