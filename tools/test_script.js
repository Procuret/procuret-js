const TEST_ENDPOINT_INPUT = document.getElementById('api-endpoint');
const TEST_API_KEY_INPUT = document.getElementById('api-key');

function deriveEndpoint() {  // -> String
    return TEST_ENDPOINT_INPUT.value
}

function deriveApiKey() {   // -> Optional<String>
    if (TEST_API_KEY_INPUT.value == '') { return null; }
    return TEST_API_KEY_INPUT.value;
}

// 1: PR_ProspectivePayment.retrieve
const TEST_1_TRIGGER = document.getElementById('run_test_1');
const TEST_1_SUPPLIER_ID = document.getElementById('1_supplier-id');
const TEST_1_PERIODS = document.getElementById('1_period-count');
const TEST_1_DENOMINATION = document.getElementById('1_currency');
const TEST_1_PRINCIPAL = document.getElementById('1_principal');

TEST_1_TRIGGER.addEventListener('click', () => {
    console.log('Executing Test 1');
    PR_ProspectivePayment.retrieve(
        (error, payment) => {

            console.log('Test 1 response received');

            if (error) {
                alert("Test failed, API returned error: " + error);
            } else if (payment == null) {
                alert("Test failed, return value is null");
            } else {
                console.log(payment);
                console.log(payment.amount);
                alert(
                    "Test completed, output:\n"
                        + "Payment amount: "
                        + payment.amount.asDenominatedString
                );
            }

            return;

        },
        TEST_1_PRINCIPAL.value,
        TEST_1_SUPPLIER_ID.value,
        PR_Currency.withId(TEST_1_DENOMINATION.value),
        TEST_1_PERIODS.value,
        deriveEndpoint()
    );
});

// 1: PR_ProspectivePayment.retrieveAllAvailable
const TEST_2_TRIGGER = document.getElementById('run_test_2');
const TEST_2_SUPPLIER_ID = document.getElementById('2_supplier-id');
const TEST_2_DENOMINATION = document.getElementById('2_currency');
const TEST_2_PRINCIPAL = document.getElementById('2_principal');

TEST_2_TRIGGER.addEventListener('click', () => {
    console.log('Executing Test 2');
    PR_ProspectivePayment.retrieveAllAvailable(
        (error, payments) => {
    
            console.log('Test 2 response received');

            if (error) {
                alert("Test failed, API returned error: " + error);
            } else if (payments == null) {
                alert("Test failed, return value is null");
            } else {
                alert(
                    "Test completed. Available payments:"
                        + payments.map((p) => {
                            return p.amount.asDenominatedString
                        })
                );
            }

            return;

        },
        TEST_2_PRINCIPAL.value,
        PR_Currency.withId(TEST_2_DENOMINATION.value),
        TEST_2_SUPPLIER_ID.value,
        deriveEndpoint()
    );
});
