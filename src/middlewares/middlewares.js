export const isConnected = (req, res, next) => {
    if (req.session.user) return res.redirect("/api/products");
    next();
};

export const isDisconnected = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

export const isAdminOrPremium = (req, res, next) => {
    const user = req.session.user;
    if (user.role === "Admin" || user.role === "Premium") {
        next();
    } else {
        res.status(401).send({ error: "Unauthorized" });
    }
};

export const isUserPremiumOrAdmin = (req, res, next) => {
    const user = req.session.user;
    console.log("soy el user del middleware", user);
    if(!user) res.status(401).redirect("/login")
    if (
        user?.role === "Admin" ||
        user?.role === "Premium" ||
        user?.role === "User"
    ) {
        next();
    } else {
        req.logger.error(
            "Users with the 'user' role do not have permissions to perform this action"
        );
        res.status(401).send(
            "Error: You do not have permissions to perform this action"
        );
    }
};

export const isUserAvailableToAddToCart = (req, res, next) => {
    if(req?.session?.user?.role === "User" || req?.session?.user?.role === "Premium") {
        next()
    } else {
        return res
            .status(403)
            .send({ error: "You must be an user to add products to cart." })
    }
};

