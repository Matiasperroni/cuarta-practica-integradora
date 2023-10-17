import userModel from '../dao/models/users.schema.js';

export const changeRole = async (req, res) => {
    try {
        const userID = req.params.uid;
        const user = req.session.user;
        console.log(user, "from changerole");

        let newRole;
        if (user?.role === "User") {
            newRole = "Premium";
        } else if (user?.role === "Premium") {
            newRole = "User";
        } else {
            res.status(404).send("User not found");
        }
        console.log(newRole, "a ver");
        if (newRole === "User" || newRole === "Premium") {
            const updatedUser = await userModel.findByIdAndUpdate(
                userID,
                { role: newRole },
                { new: true }
            );
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send("User not found.");
            }
        } else {
            res.status(400).send("Invalid role.");
        }
    } catch (error) {
        req.logger.error(`Internal error changing role. ${error}`);
        res.status(500).send(`Internal error changing role. ${error}`);
    }
};

export const addDocuments = async(req, res) => {
    try {
        const user = await userModel.findOne({email: req.session.user.email});
        console.log(user, "de add docs");
        const documents = user.documents || [];
        let userUpdated;
        if(req.files) {
            const newDocuments = [
                ...documents,
                ...req.files.map(file => ({ name: file.originalname, reference: file.path }))
            ];
            userUpdated = await user.updateOne({ documents: newDocuments });
        }

        res.status(200).send({message: "Files updated.", userUpdated})
    } catch (e) {
        res.status(500).json({ error: e });
    }

}