
// function to check either email is valid or not
export const validateEmail = (email) => {
    // Matches local-part, @, and domain with a 2+ character TLD
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
};

// function used to validate name -> contain only alphabates
export const validateName = (name) => {
    // Pattern allows letters, spaces, hyphens, and apostrophes
    // Ensures name is between 2 and 50 characters long
    const namePattern = /^[a-zA-Z\s'-]{2,50}$/;

    return namePattern.test(name.trim());
};


// function to check either number or string or object is empty or not
export const isEmpty = (value) => {

    const ValTypes = typeof value;
    switch (ValTypes.toLowerCase()) {
        case "number":
            if (!value || value == undefined || value == null) {
                return true;
            }
            break;
        case "string":
            if (!value || value.trim() === "" || value == undefined || value == null) {
                return true;
            }
            break;
        case "object":
            if (!value || value == undefined || value == null || value == {}) {
                return true;
            }
            break;
        default:
            if (!value || value.trim() === "" || value == undefined || value == null) {
                return true;
            }
            break;

    }
    return false;
};

// this function used to match exact  two values with its datatype
export const isMatch = (str1, str2) => {
    if (str1 === str2) {
        return true;
    }
    else {
        return false;
    }
}

// function used to validate password at least six charchter or not , it allowed only greater than 6 or more than 6 char
export const validatePassword = (password) => {
    // At least 6 chars, 1 letter, 1 number
    const pattern =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (password.length >= 6) {
        return true;
    } else {
        return false;
    }

};


// function is used to check request body contains data or not 
export const isBodyEmpty = (req) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return true;
    }
    return false;
}

// function used to check auth Header having token or not
export const authenticateHeader = async (authHeader = "") => {
    return await new Promise((resolve, reject) => {
        console.log("Header: ", authHeader);
        try {
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                reject({
                    success: false,
                    message: "No Token Found",
                    data: null
                });
            }
            // extract token
            const token = authHeader.split(" ")[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            resolve({
                success: true,
                message: "Token Verified",
                data: {
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded?.role || "USER",
                }
            });

        } catch (error) {
            reject({
                success: false,
                message: "Unable to verify token due to some technical internal server errors.",
                data: {
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded?.role || "USER",
                }
            });

        }
    });
}