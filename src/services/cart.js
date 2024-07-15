import axios from "axios";
import { api_url, token } from "../config/config";


export const checkout = async () => {
    let cartItems = localStorage.getItem("cart");

    // If cart data exists, parse it from JSON
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        console.log(cartItems);



        const totalAmount = cartItems.reduce((total, product) => {
            return total + product.price;
        }, 0);

        console.log(totalAmount);

        const data = {
            amount: totalAmount
        }



        try {
            const response = await axios.post(`${api_url}/card/charge`, data, {
                headers: {
                    'apiKey': `${token}`,
                    'Content-Type': 'application/json'
                }
            }
            );

            const responseData = response.data

            console.log(responseData)

        } catch (error) {
            console.log("An error occurred. Please try again.");

            console.log(error)

            const url = error.response.data.initializeTransactionResponse.data.authorization_url

            location.href = url
            console.log(url)
        }


    } else {
        // If cart data doesn't exist, display a message indicating an empty cart
        console.log("Cart is empty");
    }
}


export const extractIds = () => {
    let cartItems = localStorage.getItem("cart");

    // If cart data exists, parse it from JSON
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        return cartItems.map(item => item.id);
    }

}