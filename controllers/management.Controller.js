const asyncHandler = require("express-async-handler")

const Management = require("../models/management.Model")

const getmanagements = asyncHandler( async ( req, res) => {
    const [managements] = await Management.getmanagements()
    if(!managements){   
        res.status(404).json({message: 'Management records not found'});
    }else{
        res.status(200).json(managements);
    }
});

const createmanagement = asyncHandler(  async ( req, res)=> {
    const {airway_npo2, airway_neb, airway_cpap_fio2, airway_cpap_pip, airway_cpap_peep, airway_cpap_rr, airway_cpap_vt, airway_vent_mode, airway_vent_fio2, airway_vent_pip, airway_vent_peep, airway_vent_rr, airway_vent_vt, airway_et_tube_size, airway_et_tube_position_in_cm, airway_et_tube_cuffed, airway_et_tube_oral_nasal, airway_crico, airway_needle_decompression, airway_ic_drain, airway_suction, airway_op_tube, circulation_time_on, circulation_ng_tube, circulation_urine_cather, circulation_defb, circulation_pacing, circulation_pasg, infusion_type, infusion_site, infusion_volume, infusion_time_up, infusion_time_down, medication, medication_type, medication_dose, medication_route, medication_time, medication_admin_by, tourniquet, circulation_time_off, joules, ma, legs_abd, c_time_on, c_time_off, cpap_saturation, airway_ic_drain_postion, airway_ic_drain_size, airway_gp_tube_size } = req.body;
    if (!airway_npo2 || !airway_neb || !airway_cpap_fio2 || !airway_cpap_pip || !airway_cpap_peep || !airway_cpap_rr || !airway_cpap_vt || !airway_vent_mode || !airway_vent_fio2 || !airway_vent_pip || !airway_vent_peep || !airway_vent_rr || !airway_vent_vt || !airway_et_tube_size || !airway_et_tube_position_in_cm || !airway_et_tube_cuffed || !airway_et_tube_oral_nasal || !airway_crico || !airway_needle_decompression || !airway_ic_drain || !airway_suction || !airway_op_tube || !circulation_time_on || !circulation_ng_tube || !circulation_urine_cather || !circulation_defb || !circulation_pacing || !circulation_pasg || !infusion_type || !infusion_site || !infusion_volume || !infusion_time_up || !infusion_time_down || !medication || !medication_type || !medication_dose || !medication_route || !medication_time || !medication_admin_by || !tourniquet || !circulation_time_off || !joules || !ma || !legs_abd || !c_time_on || !c_time_off || !cpap_saturation || !airway_ic_drain_postion || !airway_ic_drain_size || !airway_gp_tube_size) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Management.createmanagement(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const getmanagement = asyncHandler( async ( req, res) => {
    const [management] = await Management.getmanagement(req.params.id);
    if(!management ){
        res.status(404).json({message: 'management not found'});
    }else{
        res.status(200).json(management);
    }
});

const updatemanagement = asyncHandler(  async ( req, res)=> {
    const [management] = await Management.updatemanagement(req.body, req.params.id);
    if(!management){
        res.status(404).json({message: 'management not found'});
    }else{
        res.status(201).json(management)
    }
});

const deletemanagement = asyncHandler( async ( req, res)=> {
    const record =  await  Management.deletemanagement(req.params.id);
    if (!record){
        res.status(404).json({message:'no management record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getmanagement, getmanagements, createmanagement, updatemanagement, deletemanagement}