const db = require("../database/db");

module.exports.getmanagements = async () => {
    const rows =  await  db.query("SELECT * From management")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getmanagement = async (id) => {
    const [row] =  await  db.query("SELECT * From management WHERE management_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletemanagement = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From management WHERE management_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createmanagement = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO management(
    airway_npo2, airway_neb, airway_cpap_fio2, airway_cpap_pip, airway_cpap_peep, airway_cpap_rr, airway_cpap_vt, airway_vent_mode, airway_vent_fio2, airway_vent_pip, airway_vent_peep, airway_vent_rr, airway_vent_vt, airway_et_tube_size, airway_et_tube_position_in_cm, airway_et_tube_cuffed, airway_et_tube_oral_nasal, airway_crico, airway_needle_decompression, airway_ic_drain, airway_suction, airway_op_tube, circulation_time_on, circulation_ng_tube, circulation_urine_cather, circulation_defb, circulation_pacing, circulation_pasg, infusion_type, infusion_site, infusion_volume, infusion_time_up, infusion_time_down, medication, medication_type, medication_dose, medication_route, medication_time, medication_admin_by, tourniquet, circulation_time_off, joules, ma, legs_abd, c_time_on, c_time_off, cpap_saturation, airway_ic_drain_postion, airway_ic_drain_size, airway_gp_tube_size
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [obj.airway_npo2,obj.airway_neb,obj.airway_cpap_fio2,obj.airway_cpap_pip,obj.airway_cpap_peep,obj.airway_cpap_rr,obj.airway_cpap_vt,obj.airway_vent_mode,obj.airway_vent_fio2,
        obj.airway_vent_pip,obj.airway_vent_peep,obj.airway_vent_rr,obj.airway_vent_vt,obj.airway_et_tube_size,obj.airway_et_tube_position_in_cm,
        obj.airway_et_tube_cuffed,obj.airway_et_tube_oral_nasal,obj.airway_crico,obj.airway_needle_decompression,obj.airway_ic_drain,obj.airway_suction,obj.airway_op_tube,obj.circulation_time_on,
        obj.circulation_ng_tube,obj.circulation_urine_cather,obj.circulation_defb,obj.circulation_pacing,obj.circulation_pasg,obj.infusion_type,
        obj.infusion_site,obj.infusion_volume,obj.infusion_time_up,obj.infusion_time_down,obj.medication,obj.medication_type,obj.medication_dose,
        obj.medication_route,obj.medication_time,obj.medication_admin_by,obj.tourniquet,obj.circulation_time_off,obj.joules,obj.ma,obj.legs_abd,
        obj.c_time_on,obj.c_time_off,obj.cpap_saturation,obj.airway_ic_drain_postion,obj.airway_ic_drain_size,obj.airway_gp_tube_size
        ])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatemanagement = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE management
    SET airway_npo2 = ?,
    airway_neb = ?,
    airway_cpap_fio2 = ?,
    airway_cpap_pip = ?,
    airway_cpap_peep = ?,
    airway_cpap_rr = ?,
    airway_cpap_vt = ?,
    airway_vent_mode = ?,
    airway_vent_fio2 = ?,
    airway_vent_pip = ?,
    airway_vent_peep = ?,
    airway_vent_rr = ?,
    airway_vent_vt = ?,
    airway_et_tube_size = ?,
    airway_et_tube_position_in_cm = ?,
    airway_et_tube_cuffed = ?,
    airway_et_tube_oral_nasal = ?,
    airway_crico = ?,
    airway_needle_decompression = ?,
    airway_ic_drain = ?,
    airway_suction = ?,
    airway_op_tube = ?,
    circulation_time_on = ?,
    circulation_ng_tube = ?,
    circulation_urine_cather = ?,
    circulation_defb = ?,
    circulation_pacing = ?,
    circulation_pasg = ?,
    infusion_type = ?,
    infusion_site = ?,
    infusion_volume = ?,
    infusion_time_up = ?,
    infusion_time_down = ?,
    medication = ?,
    medication_type = ?,
    medication_dose = ?,
    medication_route = ?,
    medication_time = ?,
    medication_admin_by = ?,
    tourniquet = ?,
    circulation_time_off = ?,
    joules = ?,
    ma = ?,
    legs_abd = ?,
    c_time_on = ?,
    c_time_off = ?,
    cpap_saturation = ?,
    airway_ic_drain_postion = ?,
    airway_ic_drain_size = ?,
    airway_gp_tube_size = ?    
    WHERE management_id = ? `,
     [obj.airway_npo2,obj.airway_neb,obj.airway_cpap_fio2,obj.airway_cpap_pip,obj.airway_cpap_peep,obj.airway_cpap_rr,obj.airway_cpap_vt,obj.airway_vent_mode,obj.airway_vent_fio2,
        obj.airway_vent_pip,obj.airway_vent_peep,obj.airway_vent_rr,obj.airway_vent_vt,obj.airway_et_tube_size,obj.airway_et_tube_position_in_cm,
        obj.airway_et_tube_cuffed,obj.airway_et_tube_oral_nasal,obj.airway_crico,obj.airway_needle_decompression,obj.airway_ic_drain,obj.airway_suction,obj.airway_op_tube,obj.circulation_time_on,
        obj.circulation_ng_tube,obj.circulation_urine_cather,obj.circulation_defb,obj.circulation_pacing,obj.circulation_pasg,obj.infusion_type,
        obj.infusion_site,obj.infusion_volume,obj.infusion_time_up,obj.infusion_time_down,obj.medication,obj.medication_type,obj.medication_dose,
        obj.medication_route,obj.medication_time,obj.medication_admin_by,obj.tourniquet,obj.circulation_time_off,obj.joules,obj.ma,obj.legs_abd,
        obj.c_time_on,obj.c_time_off,obj.cpap_saturation,obj.airway_ic_drain_postion,obj.airway_ic_drain_size,obj.airway_gp_tube_size
        , id])
    .catch(err => console.log(err))
    return data;
} 