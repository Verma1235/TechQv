

// handel manual login 
export const handelLogin = (req, res) => {
    res.send({
        success: true,
        message: "Routes are working ",
    })
}



export const handelSignup = (req, res) => {
    try {


    } catch (error) {
        console.log("Error at src/modules/auth/auth.controller :", error);

        res.status(500).send({
            success: false,
            message: "Error occurs during processing your request"
        })

    }
}