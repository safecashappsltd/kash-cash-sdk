# React Kash Cash SDK

## Installation

To install the React Kash Cash SDK, use either npm or yarn:

```bash
# Using npm
npm install kash-cash-sdk

# Using yarn
yarn add kash-cash-sdk
```

## Implementation

### 1. Initialize the SDK

In your application code, import the SDK and initialize it with your configuration. Include the following code:

```javascript
// Import the necessary types and the SDK
import { KashCashInit, Style, Type } from 'kash-cash-sdk';

// Define your configuration data
const dataToInitApi = {
  username: '',
  password: '',
  businessId: '519483894',
  pollingInterval: 1000, // (optional)
  merchantToken: '6EBB3DBD-64A1-4B4E-9E6D-08DBF1A10FA7-AAA',
  buttonStyle: Style.BRIGHT,
  buttonType: Type.WITHOUT_ICON,
};

// Initialize the SDK with the provided configuration
KashCashInit(dataToInitApi);
```

Make sure to replace the placeholder values with your actual credentials and configuration.

### 2. Integrate the Kash Cash Button

Next, add the Kash Cash button to your React Native component. Customize the button style and provide necessary callback functions:

```javascript
// Import the necessary components and types
import { KashCashButton, Style, Type } from 'kash-cash-sdk';

// Your component code...
// ...

// Add the Kash Cash button to your component
<KashCashButton
  customButtonStyle={style.button} // Customize the button style
  externalId={'dsfsdfdsdfs'} // Unique identifier for the transaction
  amount={1} // Transaction amount
  onError={e => console.log(e)} // Error callback
  onSuccess={e => console.log(e)} // Success callback
  onTransactionStatus={e => console.log(e)} // Transaction status callback
  returnUrl="https://kashcash-bd451.web.app/" // Return URL for the transaction
/>
```

Adjust the `customButtonStyle`, `externalId`, `amount`, `onError`, `onSuccess`, `onTransactionStatus`, and `returnUrl` properties as needed for your application.

## Additional Information

Now you're ready to accept Kash Cash payments in your React Native app! If you encounter any issues or have questions, refer to the [official documentation](https://example-documentation-link.com) or reach out to our support team.

Feel free to explore additional customization options and features provided by the React Native Kash Cash SDK. Happy coding!
`
