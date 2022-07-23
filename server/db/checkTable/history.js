const checkHistoryTable = (pool) => {
    console.log("HISTORY TABLE CHECK...");

    return pool
        .execute(
            `
            CREATE TABLE IF NOT EXISTS history  (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date TIMESTAMP,
                is_income BOOLEAN,
                category INT,
                payment_method INT,  
                content VARCHAR(150),
                amount INT,
                FOREIGN KEY(payment_method) REFERENCES payment_method(id) ON UPDATE CASCADE,
                FOREIGN KEY(category) REFERENCES category(id) ON UPDATE CASCADE
              );
        `,
        )
        .then(() => {
            console.log("HISTORY TABLE CHECKED!");
        })
        .catch(console.log);
};

module.exports = checkHistoryTable;
