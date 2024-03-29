describe("Assessment", () => {
    beforeEach(() => {
        cy.deleteAllButArs();
        cy.populateAssessments();
        cy.demoVolunteerLogin();
    });

    afterEach(() => {
        cy.deleteAllButArs();
        cy.logout();
    });


    it('volunteer activity table has 6 instances', () => {
        // intercept create assessment request
        //cy.intercept('POST', '/institutions/[0-9]+/assessments').as('saveAssessment');
        // intercept get assessments
        cy.intercept('GET', '/users/getAssessments').as('getAssessments');

        cy.get('[data-cy="volunteerActivities"').click();
        cy.wait('@getAssessments');

        // check results
        cy.get('[data-cy="volunteerActivitiesTable"] tbody tr')
            .should('have.length', 6)
            .eq(0)
            .children()
            .should('have.length', 10)
    });

    it('volunteer activity table first element has name \"A1\"', () => {
        // intercept get assessments
        cy.intercept('GET', '/activities').as('getActivities');

        cy.get('[data-cy="volunteerActivities"').click();
        cy.wait('@getActivities');

        //check results
        cy.get('[data-cy="volunteerActivitiesTable"] tbody tr')
            .eq(0).children().eq(0).should('contain', 'A1')
    });

    it('assessment creation success', () => {
        const REVIEW = "This is a test review.";
        const VOLUNTEER_NAME = "DEMO-VOLUNTEER";
        // intercept create assessment request
        cy.intercept('POST', '/institutions/*/assessments').as('saveAssessment');
        // intercept get assessments
        cy.intercept('GET', '/users/getAssessments').as('getAssessments');

        cy.get('[data-cy="volunteerActivities"]').click();
        cy.wait('@getAssessments');

        cy.get('[data-cy="writeAssessmentButton"]').eq(0).click();

        cy.get('[data-cy="reviewInput"]').type(REVIEW);

        cy.get('[data-cy="saveAssessment"]').click();

        cy.wait('@saveAssessment');

        cy.logout();

        cy.demoMemberLogin();

        cy.intercept('GET', '/institutions/*/assessments').as('getAssessments');
        // go to institution assessments page
        cy.get('[data-cy="institution"]').click();
        cy.get('[data-cy="assessments"]').click();
        cy.wait('@getAssessments');
        // check if table has only one assessment (and is formatted correctly)
        cy.get('[data-cy="institutionAssessmentsTable"] tbody tr')
            .should('have.length', 1)
            .eq(0)
            .children()
            .should('have.length', 3);
        // check if review has the text inserted by the volunteer
        cy.get('[data-cy="institutionAssessmentsTable"] tbody tr')
            .eq(0)
            .children()
            .eq(0).should('contain', REVIEW);
        cy.get('[data-cy="institutionAssessmentsTable"] tbody tr')
            .eq(0)
            .children()
            .eq(2).should('contain', VOLUNTEER_NAME);
    });
});