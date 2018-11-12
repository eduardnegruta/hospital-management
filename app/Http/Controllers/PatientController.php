<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatient;
use App\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $patientModel = app(Patient::class);

        $patientModel->perPage = $patientModel->getPatientsPerPage($request->perPage);

        $patients = $patientModel
            ->orderBy(
                $patientModel->getOrderByColumn($request->orderByColumn),
                $patientModel->getOrderByDirection($request->orderByDirection)
            )
            ->paginate();

        return $patients;
    }

    /**
     * @param StorePatient $request
     * @return mixed
     */
    public function store(StorePatient $request)
    {
        return Patient::create($request->all());
    }

    /**
     * @param StorePatient $request
     * @return mixed
     */
    public function update(StorePatient $request)
    {
        $patientModel = app(Patient::class);

        $patient = $patientModel->find($request->id);

        $patient->update($request->all());

        return $patient;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $patientModel = app(Patient::class);

        $patient = $patientModel->find($id);

        $patient->delete();

        return $patient;
    }
}
