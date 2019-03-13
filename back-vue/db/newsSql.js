module.exports = {
    createNews: `CREATE TABLE news (
    id int(255) NOT NULL AUTO_INCREMENT,
    type varchar(255) CHARACTER SET utf8 NOT NULL,
    title varchar(255) CHARACTER SET utf8 NOT NULL,
    description varchar(255) CHARACTER SET utf8 NOT NULL,
    occur_time varchar(255) CHARACTER SET utf8 NOT NULL,
    url varchar(255) NOT NULL,
    newsImg varchar(255) NOT NULL,
    PRIMARY KEY (id)
  )`,
    queryAll: 'SELECT * FROM news',
    queryById: 'SELECT * FROM news WHERE id = ?',
    add: 'INSERT INTO news (type, title, description, occur_time, url, newsImg) VALUES (?, ?, ?, ?, ?, ?)',
    update: 'UPDATE news SET type = ?, title = ?, description = ?, occur_time = ?, url = ?, newsImg = ? WHERE id = ?',
    delete: 'DELETE FROM news WHERE id = ?'
}
