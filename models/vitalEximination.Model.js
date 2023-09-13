const db = require("../database/db");

module.exports.getvital_examinations = async () => {
    const [rows] =  await  db.query("SELECT * From vital_examination")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getvital_examination = async (id) => {
    const [row] =  await  db.query("SELECT * From vital_examination WHERE vital_examination_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletevital_examination = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From vital_examination WHERE vital_examination_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createvital_examination = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO vital_examination(
    respiritory_rate, respiritory_rhythm, respiritory_depth, respiritory_symmetry, respiritory_saO2, pulse_rate, pulse_rhythm, pulse_volume, skin_colour, skin_moisture, Skin_temperature, skin_cap_refill, blood_pressure, hgt	
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [obj.respiritory_rate, obj.respiritory_rhythm, obj.respiritory_depth, obj.respiritory_symmetry, obj.respiritory_saO2, obj.pulse_rate, obj.pulse_rhythm, obj.pulse_volume, obj.skin_colour, obj.skin_moisture, obj.Skin_temperature, obj.skin_cap_refill, obj.blood_pressure, obj.hgt])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatevital_examination = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE vital_examination
    SET respiritory_rate = ?, 
    respiritory_rhythm = ?, 
    respiritory_depth = ?, 
    respiritory_symmetry = ?, 
    respiritory_saO2 = ?, 
    pulse_rate = ?, 
    pulse_rhythm = ?, 
    pulse_volume = ?, 
    skin_colour = ?, 
    skin_moisture = ?, 
    Skin_temperature = ?, 
    skin_cap_refill = ?, 
    blood_pressure = ?, 
    hgt = ?	
    WHERE vital_examination_id = ? `,
     [obj.respiritory_rate, obj.respiritory_rhythm, obj.respiritory_depth, obj.respiritory_symmetry, obj.respiritory_saO2, obj.pulse_rate, obj.pulse_rhythm, obj.pulse_volume, obj.skin_colour, obj.skin_moisture, obj.Skin_temperature, obj.skin_cap_refill, obj.blood_pressure, obj.hgt, id])
    .catch(err => console.log(err))
    return data;
} 