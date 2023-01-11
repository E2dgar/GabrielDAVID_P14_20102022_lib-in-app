import './index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Error } from '../atoms/error';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addEntrie } from '../../redux/reducers/employeesSlice';
import { formatDate } from '../../helpers';

import 'react-datepicker/dist/react-datepicker.css';

interface Inputs {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
}

interface InputsForm extends Inputs {
    dateOfBirth: Date;
    startDate: Date;
}
interface EmployeeData extends Inputs {
    dateOfBirth: Date | string;
    startDate: Date | string;
}

const stateOptions = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' }
];

const deptOptions = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Business Development', label: 'Business Development' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Product Management', label: 'Product Management' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Services', label: 'Services' },
    { value: 'Support', label: 'Support' },
    { value: 'Training', label: 'Training' }
];

export const Form = () => {
    const dispatch: AppDispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm<InputsForm>();

    const watchBirth = watch('dateOfBirth', undefined);
    const watchStartDate = watch('startDate', undefined);

    const onSubmit: SubmitHandler<InputsForm> = (data) => {
        let formatedData: EmployeeData = { ...data };

        formatedData.dateOfBirth = formatDate(data.dateOfBirth);
        formatedData.startDate = formatDate(data.startDate);

        try {
            dispatch(addEntrie(formatedData));
        } catch (error) {
            console.log(error);
        }

        console.log(formatedData);
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="sr-only">First Name</label>
            <input
                {...register('firstName', { required: true })}
                placeholder="First Name"
            />
            {errors.firstName && <Error />}

            <label className="sr-only">Last Name</label>
            <input
                {...register('lastName', { required: true })}
                placeholder="Last Name"
            />
            {errors.lastName && <Error />}

            <div className="dates-container">
                <div>
                    <label className={`${watchBirth ? '' : 'sr-only'}`}>
                        Date of Birth
                    </label>
                    <Controller
                        control={control}
                        name="dateOfBirth"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Birth date"
                                onChange={(date: Date) => field.onChange(date)}
                                selected={field.value}
                            />
                        )}
                    />
                    {errors.dateOfBirth && <Error />}
                </div>
                <div>
                    <label className={`${watchStartDate ? '' : 'sr-only'}`}>
                        Start Date
                    </label>
                    <Controller
                        control={control}
                        name="startDate"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Start date"
                                onChange={field.onChange}
                                selected={field.value}
                                dateFormat="yyyy/MM/dd"
                            />
                        )}
                    />
                    {errors.startDate && <Error />}
                </div>
            </div>

            <fieldset>
                <legend>Address</legend>
                <label className="sr-only">Street</label>
                <input
                    {...register('street', { required: true })}
                    placeholder="Street"
                />
                {errors.street && <Error />}

                <label className="sr-only">City</label>
                <input
                    {...register('city', { required: true })}
                    placeholder="City"
                />
                {errors.city && <Error />}

                <label>State</label>
                <Controller
                    control={control}
                    name="state"
                    render={({ field }) => (
                        <Select
                            className="select"
                            classNamePrefix="react-select"
                            options={stateOptions}
                            defaultValue={stateOptions[0]}
                            onChange={(state) => field.onChange(state?.value)}
                        />
                    )}
                />

                <label className="sr-only">Zip Code</label>
                <input
                    {...register('zipCode', { required: true })}
                    type="number"
                    placeholder="Zip Code"
                />
                {errors.zipCode && <Error />}
            </fieldset>

            <label>Department</label>
            <Controller
                control={control}
                name="state"
                render={({ field }) => (
                    <Select
                        className="select"
                        classNamePrefix="react-select"
                        options={deptOptions}
                        defaultValue={deptOptions[0]}
                        onChange={(state) => field.onChange(state?.value)}
                    />
                )}
            />
            <input type="submit" value="Save" />
        </form>
    );
};
