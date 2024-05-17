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

//-----------------------------ADMIN(Operator)--------------------------------------------------------------------------------

// Cypress.Commands.add('setAdminCredentials', (userName, password) => {
//   Cypress.env('adminUsername', userName);
//   Cypress.env('adminPassword', password);
// }); // connected with 

// Cypress.Commands.add('AdminLogin', (baseUrl) => {

//   cy.visit(baseUrl);
//   cy.url().should('include', '/login?prefix=iamadmin');
//   cy.contains('Welcome back!');
//   cy.contains('Sign in to your account to continue');

//   // cy.origin('https://cabinet.retail.esempla.systems/login?prefix=iamadmin', () => {

//   // cy.url().should('include', '/login?prefix=iamadmin');
//   // cy.contains('Welcome back!');
//   // cy.contains('Sign in to your account to continue');

//   //   const adminUsername = Cypress.env('adminUserName');
//   //   const adminPassword = Cypress.env('adminPassword');
      
//   //     cy.get('#UsernamePassword').type(adminUsername);
//   //     cy.get('#Password').type(adminPassword);
//   //     cy.contains('button[type="submit"]').click(); // clicking on the [Sign in] button
//   //     cy.contains('Welcome, to Retail Management!');
//   //     cy.contains('You are logged in as user "Dumitru Virtosu".');
//   //   });
//   //     cy.get('#account-menu').should('contain', 'Administrator Administrator');

// });

Cypress.Commands.add('AdminSimpleLogin', (baseUrl, username, password) => {

    cy.visit(baseUrl);
    cy.url().should('include', '/login?prefix=iamadmin');
    cy.contains('Welcome back!');
    cy.contains('Sign in to your account to continue');
    cy.wait(500);
    cy.get('#username').type(username);
    cy.wait(500);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click(); // [Sign In] button
    cy.contains('Welcome, to Retail Management!');
    cy.contains('You are logged in as user "Administrator Administrator".');
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
  // Define available GS types
  const gstypes = {
    TREASURY_BILLS: 'TREASURY_BILLS',
    GOVERNMENT_BONDS: 'GOVERNMENT_BONDS',
  };

  // Click the dropdown element to open it
  cy.get('#field_securitiesName').invoke('click');

  // Get all options except the disabled "Select GS Type"
  cy.get('#field_securitiesName option:not([disabled])').then(($options) => {
    // Get a random index to select an option
    const randomIndex = Math.floor(Math.random() * $options.length);

    // Get the value of the randomly selected option
    const randomValue = $options.eq(randomIndex).val();

    // Select the option with the random value
    cy.get('#field_securitiesName').select(randomValue);
  });
});

Cypress.Commands.add('SelectRandomCirculationTermTreasuryBills', () => {
  // Define available circulation terms
  const circulationTerms = {
    "60 Day": '60 Day',
    "90 Day": '90 Day',
    "120 Day": '120 Day',
  };

  // Click the dropdown element to open it
  cy.get('.ng-select-container').click();

  // Get all options except the disabled placeholder
  cy.get('.ng-dropdown-panel-items .ng-option').then(($options) => {
    // Get a random index to select an option
    const randomIndex = Math.floor(Math.random() * Object.keys(circulationTerms).length);

    // Get the value of the randomly selected option
    const randomKey = Object.keys(circulationTerms)[randomIndex];
    const randomValue = circulationTerms[randomKey];

    // Select the option with the random value
    cy.contains(randomKey).click();
  });
});

Cypress.Commands.add('SelectRandomCirculationTermGovernmentBonds', () => {
  // Define available circulation terms
  const circulationTerms = {
    "1 Year": '1 Year',
    "2 Year": '2 Year',
    "3 Year": '3 Year',
  };

  // Click the dropdown element to open it
  cy.get('.ng-select-container').click();

  // Get all options except the disabled placeholder
  cy.get('.ng-dropdown-panel-items .ng-option').then(($options) => {
    // Get a random index to select an option
    const randomIndex = Math.floor(Math.random() * Object.keys(circulationTerms).length);

    // Get the value of the randomly selected option
    const randomKey = Object.keys(circulationTerms)[randomIndex];
    const randomValue = circulationTerms[randomKey];

    // Select the option with the random value
    cy.contains(randomKey).click();
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

  Cypress.Commands.add('GenerateCurrentDateTimeIssueDateField', () => {
    const now = new Date();
  
    // Format the date as "day/month/year"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDateTime = `${day}.${month}.${year}`;

    // Click on the input field to open the datepicker
    cy.get('fa-icon[icon="calendar-alt"]').eq(0).click();

    // Click on the current date in the datepicker
    cy.contains('.ngb-dp-day', day).click();

    // Confirm that the date has been selected
    cy.get('#field_issueDate').should('have.value', currentDateTime);
});

  Cypress.Commands.add('GenerateCurrentDateTimeStartDateFieldTB', () => {

    const now = new Date();
  
    // Format the date as "day/month/year"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

    // Click on the input field to open the datepicker
    cy.get('fa-icon[icon="calendar-alt"]').eq(2).click();

    // Click on the current date in the datepicker
    cy.contains('.ngb-dp-day', day).click({force: true});

    cy.get('#sidebar-action').click();

    // Confirm that the date has been selected
    //cy.get('#field_subscriptionStartDate').should('have.value', currentDateTime);
  
  });

  Cypress.Commands.add('GenerateFutureDateTimeEndDateFieldTB', () => {
  
    const now = new Date();

    // // Add 7 days to the current date to get a future date
     const futureDate = new Date(now);
     futureDate.setDate(futureDate.getDate() + 15);
    
    // Format the date as "day/month/year"
    const year = now.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const futureDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
    
    // Click on the input field to open the datepicker
    cy.get('#field_subscriptionEndDate > .input-group > .btn').click();

    // Click on the current date in the datepicker
    cy.contains('.ngb-dp-day', day).click();

    // Confirm that the date has been selected
    //cy.get('#field_subscriptionEndDate').should('have.value', futureDateTime);

    
});

Cypress.Commands.add('GenerateCurrentDateTimeStartDateFieldGB', () => {

  const now = new Date();

  // Format the date as "day/month/year"
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  // Click on the input field to open the datepicker
  cy.get('#field_subscriptionStartDate > .input-group > .btn').click();

  // Click on the current date in the datepicker
  cy.contains('.ngb-dp-day', day).click({force: true});

  cy.get('#sidebar-action').click();

  // Confirm that the date has been selected
  //cy.get('#field_subscriptionStartDate').should('have.value', currentDateTime);

});

Cypress.Commands.add('GenerateFutureDateTimeEndDateFieldGB', () => {

  const now = new Date();

  // // Add 7 days to the current date to get a future date
   const futureDate = new Date(now);
   futureDate.setDate(futureDate.getDate() + 15);
  
  // Format the date as "day/month/year"
  const year = now.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const futureDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
  
  // Click on the input field to open the datepicker
  cy.get('#field_subscriptionEndDate > .input-group > .btn').click();

  // Click on the current date in the datepicker
  cy.contains('.ngb-dp-day', day).click();

  // Confirm that the date has been selected
  //cy.get('#field_subscriptionEndDate').should('have.value', futureDateTime);

  
});

Cypress.Commands.add('GenerateDateTimeCouponPaymentDates', () => {

  // Get the current date and time
  const now = new Date();

  // Add 7 days to the current date to get a future date
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate());

  // Format the future date as "YYYY-MM-DD HH:mm:ss"
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 5).padStart(2, '0'); // trebuie sa fie achitarea odata la jum de an
  const day = String(futureDate.getDate()).padStart(2, '0');
  const hours = String(futureDate.getHours()).padStart(2, '0');
  const minutes = String(futureDate.getMinutes()).padStart(2, '0');
  const seconds = String(futureDate.getSeconds()).padStart(2, '0');

  const futureDateTime = `${day}.${month}.${year}`;

  // Set the future date and time into the input field
  cy.get('#startDate').clear().type(futureDateTime);
});

Cypress.Commands.add('DeleteCreatedGSTreasuryBill', (isinCode) => {

  cy.get('#page-heading').should('contain', 'Government Securities');
  cy.get('.alert').should('contain', 'A new Government Securities is created with identifier');

        const tableBody = cy.get('tbody');

        // Find the rows (td elements) containing the code
        const matchingCell = tableBody.find('td').contains(isinCode);

        // Get the first matching row
        const matchingRow = matchingCell.parent();

        // Click the edit button within the first matching row (assuming button class is 'edit-btn')
        cy.wait(1000);
        matchingRow.find('button[data-cy="entityDeleteButton"]').click();

        cy.get('#jhi-delete-governmentSecuritiesNew-heading').should('contain', 'Are you sure you want to delete Government Securities'); // validating delete action
        cy.get('button[data-cy="entityConfirmDeleteButton"]').click(); // clicking/confirming the delete action 

        cy.get('div.top.right ngb-alert.alert-success').should('contain', 'A Government Securities is deleted with identifier'); // validating delete action


});

Cypress.Commands.add('DeleteCreatedGSGovernmentBond', (isinCode) => {

        cy.get('#page-heading').should('contain', 'Government Securities');
        cy.get('.alert').should('contain', 'A new Government Securities is created with identifier');

        const tableBody = cy.get('tbody');

        // Find the rows (td elements) containing the code
        const matchingCell = tableBody.find('td').contains(isinCode);

        // Get the first matching row
        const matchingRow = matchingCell.parent();

        // Click the edit button within the first matching row (assuming button class is 'edit-btn')
        matchingRow.find('button[data-cy="entityDeleteButton"]').click();

        cy.get('#jhi-delete-governmentSecuritiesNew-heading').should('contain', 'Are you sure you want to delete Government Securities'); // validating delete action
        cy.get('button[data-cy="entityConfirmDeleteButton"]').click(); // clicking/confirming the delete action 

        cy.get('div.top.right ngb-alert.alert-success').should('contain', 'A Government Securities is deleted with identifier'); // validating delete action
    
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


//-----------------------------INVESTOR--------------------------------------------------------------------------------

Cypress.Commands.add('setInvestorCredentials', (IDNP, password) => {
  Cypress.env('originIDNP', IDNP);
  Cypress.env('originPassword', password);
}); // connected with the InvestorRegistration  and Investor Login command


Cypress.Commands.add('InvestorRegistration', (baseUrl) => {

  cy.visit(baseUrl);
  
  cy.get('#navbarResponsive')
  .should('contain', 'About')
  .should('contain', 'Subscription calendar')
  .should('contain', 'Statistics')
  .should('contain', 'News')
  .should('contain', 'Contacts')
  //.should('containt', 'English')
  .should('contain', 'Authentication');
  
  cy.contains('Authentication').click();

  cy.origin('https://mpass.staging.egov.md/login/saml', () => {

    const originIDNP = Cypress.env('originIDNP');
    const originPassword = Cypress.env('originPassword');

    cy.get('.description-align').should('contain', 'Serviciul de autentificare și control al accesului');
    cy.contains('Selectați modalitatea de autentificare');
      
      cy.get('#UsernamePassword').type(originIDNP);
      cy.get('#Password').type(originPassword);
      cy.contains('Intră').click();
    });
      cy.get('#account-menu').should('contain', 'Doruc Stanislav');
});

Cypress.Commands.add('InvestorLogin', (baseUrl) => {

  cy.visit(baseUrl);

  cy.contains('Authentication').click();

  cy.origin('https://mpass.staging.egov.md/login/saml', () => {

    const originIDNP = Cypress.env('originIDNP');
    const originPassword = Cypress.env('originPassword');

    cy.get('.description-align').should('contain', 'Serviciul de autentificare și control al accesului');
    cy.contains('Selectați modalitatea de autentificare');
      
      cy.get('#UsernamePassword').type(originIDNP);
      cy.get('#Password').type(originPassword);
      cy.contains('Intră').click();
    });
      cy.get('#account-menu').should('contain', 'Doruc Stanislav');

});

Cypress.Commands.add('SelectRandomDocType', () => {
  
  const DocumentTypes = {
    BULETIN: 'CA Buletin de identitate al cetăţeanului Republicii Moldova',
    PASAPORT: 'PA Paşaportul Cetăţeanului Republicii Moldova'
  };

     // Click the dropdown element to open it
  cy.get('#field_docType').click();

  // Get all options
  cy.get('.ng-option').then(($options) => {
    // Get a random index to select an option
    const randomIndex = Math.floor(Math.random() * Object.keys(DocumentTypes).length);

    // Get the key of the randomly selected option from the enum
    const randomDocumentTypeKey = Object.keys(DocumentTypes)[randomIndex];

    // Select the option with the random key
    cy.get('#field_docType').contains(DocumentTypes[randomDocumentTypeKey]).click({force:true});
  });
  
});

Cypress.Commands.add('SelectRandomIncomeSource', () => {

  const incomeOption = {
    ALLOCATIE: 'Alocație',
    SALARIU: 'Salariu',
    ALTE_SURSE: 'Alte surse',
    DONATIE: 'Donație',
    INVESTITII: 'Investiții'
  };
  
  // Click the dropdown element to open it
  cy.get('.ng-arrow-wrapper').click();
  
  // Get the currently selected option
  cy.get('.ng-select-container').then(($container) => {
    const selectedOption = $container.find('.label-span').text().trim();
    
    // Filter out the selected option from the available options
    const availableOptions = Object.values(incomeOption).filter(option => option !== selectedOption);
    
    // Get a random index to select an option from the available options
    const randomIndex = Math.floor(Math.random() * availableOptions.length);
  
    // Get the randomly selected option
    const randomOptionValue = availableOptions[randomIndex];
    
    // Click the randomly selected option
    cy.get('.ng-dropdown-panel').contains(randomOptionValue).click();
  });
});


Cypress.Commands.add('SelectRandomBankCommercialBank', () => {

  const bankOptions = {
    COMERTBANK : "(CMTBMD2X) BC'COMERTBANK'S.A.",
    COMERTBANK_CHISINAU : "(CMTBMD2X498) B.C.'COMERTBANK'S.A. suc.nr.1 Chisinau",
    COMERTBANK_BALTI : "(CMTBMD2X508) B.C.'COMERTBANK'S.A. suc.nr.2 Balti",
    COMERTBANK_CHISINAU_NR3 : "(CMTBMD2X511) B.C.'COMERTBANK'S.A. suc.nr.3 Chisinau",
    COMERTBANK_CHISINAU_NR4 : "(CMTBMD2X521) B.C.'COMERTBANK'S.A. suc.nr.4 Chisinau",
    ENERGBANK: "(ENEGMD22) B.C.'ENERGBANK'S.A.",
    ENERGBANK_CHISINAU: "(ENEGMD22409) B.C.'ENERGBANK'S.A. fil.'Ismail' Chisinau",
    ENERGBANK_BOTANICA: "(ENEGMD22858) B.C.'ENERGBANK'S.A. suc.'Botanica' Chisinau"
  };

  // Click the dropdown element to open it
  cy.get('ng-select').click();

  // Get the currently selected bank from the field
  cy.get('.ng-input > input').then(($input) => {
    const selectedBankInField = $input.val().trim();

    // Filter out the selected bank from the available banks
    const availableBanks = Object.values(bankOptions).filter(bank => bank !== selectedBankInField);

    // Get a random index to select a bank from the available banks
    const randomIndex = Math.floor(Math.random() * availableBanks.length);

    // Get the randomly selected bank
    const randomBankValue = availableBanks[randomIndex];

    // Click the randomly selected bank from the dropdown
    cy.get('.ng-dropdown-panel-items').contains(randomBankValue).click();

  });
});


Cypress.Commands.add('ActivateEmailCriticalField', (emailCriticalField) => {
  
      const tableBody = cy.get('tbody');

      // Find the rows (td elements) containing the code
      const matchingCell = tableBody.find('tr').contains(emailCriticalField);

      // Get the first matching row
      const matchingRow = matchingCell.parent().parent();

      // Click the edit button within the first matching row (assuming button class is 'edit-btn')
      const activateButton = matchingRow.find('[jhitranslate="retailManagementApp.msProfileEditManagement.state.activated"]').click();

      // would be good to make an assert on button, later(if its activated to deactivate it so that the test to pass)

      cy.get('[jhitranslate="entity.update.title"]').should('contain', 'Confirm update operation'); // confirmation pop-up heading
      cy.get('#deactivate-heading').should('contain', 'Vă rugăm să confirmați dacă sunteți sigur că doriți să actualizați starea campului '); // confirmation pop-up message

      cy.get('[data-cy="entityConfirmButton"]').click(); // clicking on the [Confirm] button
     // cy.get('[jhitranslate="retailManagementApp.msProfileEditManagement.state.activated"]')
      //.should('have.attr', 'class', 'btn btn-sm btn-rounded w-100 btn-success'); // validating that button status is activated

});

Cypress.Commands.add('DeactivateEmailCriticalField', (emailCriticalField) => {
  
  const tableBody = cy.get('tbody');

  // Find the rows (td elements) containing the code
  const matchingCell = tableBody.find('tr').contains(emailCriticalField);

  // Get the first matching row
  const matchingRow = matchingCell.parent().parent();

  // Click the edit button within the first matching row (assuming button class is 'edit-btn')
  const activateButton = matchingRow.find('[jhitranslate="retailManagementApp.msProfileEditManagement.state.deactivated"]').click();

  // would be good to make an assert on button, later(if its activated to deactivate it so that the test to pass)

  cy.get('[jhitranslate="entity.update.title"]').should('contain', 'Confirm update operation'); // confirmation pop-up headin
  cy.get('#activate-heading').should('contain', 'Vă rugăm să confirmați dacă sunteți sigur că doriți să actualizați starea campului '); // confirmation pop-up message

  cy.get('[data-cy="entityConfirmButton"]').click(); // clicking on the [Confirm] button

});

Cypress.Commands.add('ChangeInvestorProfileToActive', (lastName, birthPlace, userOccupation, employmentOrganization, jobTitle, 
  docSeries, docNumber, docIssueOrganization, addressLine, postalCode, localityName, bankIban, phoneNumber, email) => {

 cy.contains('Investors').click(); // clicking on the "Investors" tab
 cy.get('[routerlink="/investor-profiles"]').click(); // clicking on the "All Investors" option

 cy.contains('Investor Profiles'); // validating that admin is on the "Investor profiles" page

 const tableBody = cy.get('tbody');

 // Find the rows (td elements) containing the code
 const matchingCell = tableBody.find('td').contains(lastName);

 // Get the first matching row
 const matchingRow = matchingCell.parent();

 // Click the edit button within the first matching row (assuming button class is 'edit-btn')
 matchingRow.find('a[data-cy="entityDetailsButton"]').should('be.visible').click();

 cy.contains(lastName); // validating that admin is on Investor's profile

 // validating the fields that were changed, first 2 tables
   cy.contains(birthPlace).should('exist').should('be.visible'); // birthPlace field
   cy.contains(userOccupation).should('exist').should('be.visible'); // userOccupation field
   cy.contains(employmentOrganization).should('exist').should('be.visible'); // employmentOrganization field
   cy.contains(jobTitle).should('exist').should('be.visible'); // jobTitle field
   

     // second 2 tables data
     //cy.contains(docType).should('exist'); // docType field
     cy.contains(docSeries).should('exist').should('be.visible'); // docSeries field
     cy.contains(docNumber).should('exist').should('be.visible'); // docNumber field
     cy.contains(docIssueOrganization).should('exist').should('be.visible'); // docIssueOrganization field
     cy.contains(addressLine).should('exist').should('be.visible'); // addressLine field
     cy.contains(postalCode).should('exist').should('be.visible'); // postalCode field
     cy.contains(localityName).should('exist').should('be.visible'); // localityName field

     cy.scrollTo('bottom'); // scrolling down
     cy.wait(500);

   // third 2 tables data
    cy.contains(bankIban).should('exist');
    cy.contains(phoneNumber).should('exist');
    cy.contains(email).should('exist');

   cy.get('[ng-reflect-jhi-translate="global.boolean.true"]').should('contain', "Yes") // declaration field



});


Cypress.Commands.add('ValidateCriticalFieldData', () => {


});
