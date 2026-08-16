const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
    const cookies = req.headers.cookie || "";

    const match = cookies.match(/kyl_admin_token=([^;]+)/);

    if (!match) {
        return res.redirect("/login.html");
    }

    const token = decodeURIComponent(match[1]);

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.redirect("/login.html");
        }

        req.admin = decoded;

        next();

    } catch (error) {
        return res.redirect("/login.html");
    }
}

module.exports = requireAdmin;
