module.exports = function validatePassword(req, res, next) {
    const deletePassword = req.body.delete_password;
    if (!deletePassword) {
        res.status(400).json({ error: 'Thread needs to have a delete password' });
    }
    if (deletePassword.length < 8) {
        res.status(400).json({ error: 'Password must have at least 8 chars' });
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^'])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/.test(deletePassword)) {
        res.status(400).json({ error: 'Password must contain at least one letter, number and special character' });
    }
    next();
}
