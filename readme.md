## Frameworks and packages

### Back-End

- [Laravel](https://laravel.com/), 
[laravel-model-json-storage](https://github.com/Okipa/laravel-model-json-storage)


### Front-End 

- [CoreUI](https://coreui.io/)
- [React.js](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)

## Run the app

Run following commands in the root directory.

- `composer install`
- `npm install`

Create `.env` file in the root directory and copy there all from `.env.example` and run `php artisan key:generate`

- In one terminal window run `npm run watch`
- In another terminal window run `php artisan:serve`

Open browser and go to `http://localhost:8000`.

## Add new patient

Click on the `Create new patient` button, fill up the form and click `Create new patient` button.

If the validation passes u should see one record in patients data table and the chart should update.

## Add new field 

Let's add age field for the patients.

### Back-End

In `/app/Patient.php` add age field to `$fillable` array.

```php
protected $fillable = [
        'name',
        'height',
        'weight',
        'age',
    ];
```

Age field should be filterable so add it to `$filterable` array.

```php
protected $filterable = [
        'id',
        'name',
        'height',
        'weight',
        'created_at',
        'updated_at',
        'age',
    ];
```

Now we should add some validation rules to age field in the 
`/app/Http/Requests/StorePatient.php` in `rules()` method, 
[validation rules](https://laravel.com/docs/5.7/validation#available-validation-rules).

```php
public function rules()
    {
        return [
            'name'   => 'required|string|between:3,64',
            'height' => 'required|numeric|between:1,300',
            'weight' => 'required|numeric|between:1,500',
            'age'    => 'required|numeric|between:0,150',
        ];
    }
```

All patients data are saved in `/storage/app/json/patient.json`.

### Front-End

Add age field to `/resources/js/models/patient.js`.

```javascript
const patient = {
  name: '',
  height: '',
  weight: '',
  age: ''
}
```

Add age input to `/resources/js/components/PatientModal.js` under the patient weight field.

```html
<div className="form-group">
    <label className="col-form-label" htmlFor="age">Patient's age *</label>

    <div className="input-group">
      <input onChange={this.props.handleFormFieldChange}
             value={this.props.patient.age}
             className={`form-control ${this.errorClass('age')}`}
             id="age"
             type="number"
             name="age"
             placeholder="Patient's age"
             required={true}
      />

      <div className="invalid-feedback">{this.errorDescription('age')}</div>
    </div>
  </div>
```

And the last step is to add age column in the data table `/resources/js/views/Patients/PatientsDataTable`.

```javascript
const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Height',
        accessor: 'height'
      },
      {
        Header: 'Weight',
        accessor: 'weight'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      ...
]
```

Our hospital management app now have new age field.
