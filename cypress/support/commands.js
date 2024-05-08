// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('AdminLogin', (baseUrl, username, password) => {
    cy.visit(baseUrl);
    cy.url().should('include', '/login?prefix=iamadmin');
    cy.contains('Welcome back!');
    cy.contains('Sign in to your account to continue');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click(); // [Sign In] button
    cy.contains('Welcome, to Retail Management!');
    cy.contains('You are logged in as user "Dumitru Virtosu".');
});

Cypress.Commands.add('DeleteCreatedBank', (IDNO) => {
    
    cy.get('button[data-cy="entityCreateButton"]').should('contain', 'Add new'); // validating that user is redirected back to bank list
    
        const tableBody = cy.get('tbody');

        // Find the rows (td elements) containing the code
        const matchingCell = tableBody.find('td').contains(IDNO);

        // Get the first matching row
        const matchingRow = matchingCell.parent();

        // Click the edit button within the first matching row (assuming button class is 'edit-btn')
        matchingRow.find('button[data-cy="entityDeleteButton"]').click();

        cy.get('#jhi-delete-cfCommercialBanks-heading').should('contain', 'Are you sure you want to delete Cf Commercial Banks'); // validating delete action
        cy.get('button[data-cy="entityConfirmDeleteButton"]').click(); // clicking/confirming the delete action 

        cy.get('div.top.right ngb-alert.alert-success').should('contain', 'A Cf Commercial Banks is deleted with identifier'); // validating delete action
});

Cypress.Commands.add('DeleteCreatedGsPlacement', (isinCode) => {
    
    cy.get('span[jhitranslate="entity.action.addnew"]').should('contain', 'Add new'); // validating that user is redirected back to bank list
    
        const tableBody = cy.get('tbody');

        // Find the rows (td elements) containing the code
        const matchingCell = tableBody.find('td').contains(isinCode);

        // Get the first matching row
        const matchingRow = matchingCell.parent();

        // Click the edit button within the first matching row
        matchingRow.find('button[data-cy="entityDeleteButton"]').click();

        cy.get('#jhi-delete-gsPlacement-heading').should('contain', 'Are you sure you want to delete Gs Placement'); // validating delete action
        cy.get('button[data-cy="entityConfirmDeleteButton"]').click(); // clicking/confirming the delete action 

        cy.get('.alert').should('exist').should('be.visible').should('not.be.empty'); // validating the confirmation message
        cy.contains('Gs Placements');
});

Cypress.Commands.add('ViewDetailsCreatedBank', (bic, idno, name, nameRu, nameEn, createDate, createBy, updateDate, updateBy, closeDate, comment) => {

    cy.get('span[jhitranslate="entity.action.addnew"]').should('contain', 'Add new'); // validating that user is redirected back to bank list
    
        const tableBody = cy.get('tbody');
        const matchingCell = tableBody.find('td').contains(idno);
        const matchingRow = matchingCell.parent();
        matchingRow.find('a[data-cy="entityDetailsButton"]').click(); // clicking on the [Details] button

                cy.get('.row-md') // validating the name of the fields
                .should('contain', 'Bic')
                .should('contain', 'Idno')
                .should('contain', 'Name')
                .should('contain', 'Name Ru')
                .should('contain', 'Name En')
                .should('contain', 'Create Date')
                .should('contain', 'Create By')
                .should('contain', 'Update Date')
                .should('contain', 'Update By')
                .should('contain', 'Close Date')
                .should('contain', 'Comment')

                cy.get('.row-md') // validating the user's input in the fields
                .should('contain', bic).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', idno).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', name).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', nameRu).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', nameEn).should('exist').should('be.visible').should('not.be.empty');
});

Cypress.Commands.add('ViewDetailsCreatedGsPlacement', ( title, isinCode, nominalValue, currentPrice, currency,
    interestRate, yieldValue, indicativeVolume, miminumOrder, maximumOrder, maximumOwnershipQt, couponPaymentsDate) => {

    cy.get('span[jhitranslate="entity.action.addnew"]').should('contain', 'Add new'); // validating that user is redirected back to bank list
    
        const tableBody = cy.get('tbody');
        const matchingCell = tableBody.find('td').contains(isinCode);
        const matchingRow = matchingCell.parent();
        matchingRow.find('a[data-cy="entityDetailsButton"]').click(); // clicking on the [Details] button

                cy.get('div[class="mt-2 tab-content"]') // validating the name of the fields
                .should('contain', 'Title')
                .should('contain', 'Type')
                .should('contain', 'Isin Code')
                .should('contain', 'Subscription Start Date')
                .should('contain', 'Subscription End Date')
                .should('contain', 'Nominal Value')
                .should('contain', 'Maturity Date')
                .should('contain', 'Circulation Term')
                .should('contain', 'Interest Rate')
                .should('contain', 'Current Price')
                .should('contain', 'Indicative Volume')
                .should('contain', 'Yield')
                .should('contain', 'Coupon Payment Dates')
                .should('contain', 'State')
                .should('contain', 'Minimum Order')
                .should('contain', 'Maximum Order')
                .should('contain', 'Maximum Ownership Qt')
                .should('contain', 'Currency')
                .should('contain', 'Secondary Market Sell')

                cy.get('.col-12') // validating the user's input in the fields
                //.should('contain', type).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', title).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', isinCode).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', nominalValue).should('exist').should('be.visible').should('not.be.empty')
                //.should('contain', circulationTerm).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', currentPrice).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', currency).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', interestRate).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', yieldValue).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', indicativeVolume).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', miminumOrder).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', maximumOrder).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', maximumOwnershipQt).should('exist').should('be.visible').should('not.be.empty')
                .should('contain', couponPaymentsDate).should('exist').should('be.visible').should('not.be.empty');
});

Cypress.Commands.add('DisplayOnlyActiveFields', () => {
  
    cy.get('tbody').find('tr').each(($tr) => {
    const $button = $tr.find('button[ng-reflect-ng-class="btn-success"]');
    if ($button.length > 0) {
        const optionName = $tr.find('td').eq(0).find('span');
        const text = optionName.text().trim();
        cy.log(text);
    }
})
});

Cypress.Commands.add('SelectRandomGSType', () => {

    const gstypes = {
        TREASURY_BILLS: 'TREASURY_BILLS',
        GOVERNMENT_BONDS: 'GOVERNMENT_BONDS',
      };

      cy.get('#field_type').invoke('click'); // Click the dropdown element

// Get all options except the disabled "Select GS Type"
cy.get('#field_type option').not(':disabled:nth-child(1)').then(($options) => {
  // Get a random key from the gstypes object
  const randomKey = Object.keys(gstypes)[Math.floor(Math.random() * Object.keys(gstypes).length)];

  // Get the corresponding value from the random key
  const randomValue = gstypes[randomKey];

  // Select the option with the random value (no typing involved)
  cy.get(`#field_type option[value="${randomValue}"]`).invoke('click');
  });
  });

Cypress.Commands.add('SelectRandomCurrency', () => {
    // Enum for currency options
    const CurrencyOptions = {
      USD: 'USD',
      EUR: 'EUR',
      MDL: 'MDL'
    };
  
    // Get all the options within the dropdown
    cy.get('#field_currency').find('option').then(options => {
      // Filter out disabled option
      const filteredOptions = options.filter((index, element) => {
        return !element.disabled;
      });
  
      // Calculate the number of options
      const numOptions = filteredOptions.length;
  
      // Generate a random index between 0 and the number of options - 1
      const randomIndex = Math.floor(Math.random() * numOptions);
  
      // Get the value of the randomly selected option
      const selectedOptionValue = filteredOptions.eq(randomIndex).val();
  
      // Select the option by its value
      cy.get('#field_currency').select(selectedOptionValue);
    });
  });

Cypress.Commands.add('RandomlyCheckboxClick', () => {
    // Generate a random boolean value (true or false)
    const shouldToggle = Math.random() < 0.5;
  
    // Check if the checkbox should be toggled
    if (shouldToggle) {
      // Click on the checkbox
      cy.get('#field_secondaryMarketSell').click();
    } else {
      // Leave the checkbox unchecked
      cy.get('#field_secondaryMarketSell').click();
    }
  });

Cypress.Commands.add('GenerateCurrentDateTime', () => {
    // Get the current date and time
    const now = new Date();
  
    // Format the date and time as "YYYY-MM-DD HH:mm:ss"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    // Set the generated current date and time into the input field
    cy.get('#field_couponPaymentDates').type(currentDateTime);
  });













// ----------- Classifiers Commands---------------------------
Cypress.Commands.add('AddNewCommercialBank', () => {

});

Cypress.Commands.add('AddNewCountry', () => {

});

Cypress.Commands.add('AddNewSourceIncome', () => {

});

Cypress.Commands.add('AddNewCirculationTerm', () => {

});

Cypress.Commands.add('AddNewCommercialBank', () => {

});

// -------------------- GS Management Commands--------------------

Cypress.Commands.add('AddNewGsPlacement', () => {

});

Cypress.Commands.add('AddNewCommercialBank', () => {

});