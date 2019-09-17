const getTableData = async (req, res, db) => {
  try {
    const records = await db.select('*').from('testtable');
    if (records.length) {
      res.json(records)
    } else {
      res.json({dataExists: 'false'})
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};

const postTableData = async (req, res, db) => {
  try {
    const {firstName, lastName, email, phone, location, hobby} = req.body;
    const added = new Date();
    const newRecord = await db('testtable')
      .insert({firstName, lastName, email, phone, location, hobby, added})
      .returning('*');
    res.json(newRecord);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};

const putTableData = async (req, res, db) => {
  try {
    const {id, firstName, lastName, email, phone, location, hobby} = req.body;
    const updatedItem = await ('testtable').where({id})
      .update({firstName, lastName, email, phone, location, hobby})
      .returning('*');
    res.json(updatedItem);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error')
  }
};

const deleteTableData = async (req, res, db) => {
  try {
    const {id} = req.body;
    await db('testtable').where({id})
      .del();
    res.json({delete: true});
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
};
