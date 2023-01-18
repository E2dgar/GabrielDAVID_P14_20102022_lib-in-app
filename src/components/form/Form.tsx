import './index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Error } from '../atoms/error';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addEntrie } from '../../redux/reducers/employeesSlice';
import { formatDate } from '../../helpers';
import { STATE_OPTIONS, DEPT_OPTIONS } from '../../constants/content';

import 'react-datepicker/dist/react-datepicker.css';

export interface Inputs {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    department: string;
    zipCode: number;
}

export interface InputsForm extends Inputs {
    dateOfBirth: Date;
    startDate: Date;
}
export interface EmployeeData extends Inputs {
    dateOfBirth: Date | string;
    startDate: Date | string;
}

export type FormT = {
    openModal: () => void;
};

/**
 * @component Form component
 * @returns {JSX.Element}
 */
export const Form = ({ openModal }: FormT) => {
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
        console.log('data', data);
        let formatedData: EmployeeData = { ...data };

        formatedData.dateOfBirth = formatDate(data.dateOfBirth);
        formatedData.startDate = formatDate(data.startDate);

        try {
            dispatch(addEntrie(formatedData));
            openModal();
        } catch (error) {
            console.log(error);
        }

        console.log(formatedData);
    };

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
                    defaultValue={STATE_OPTIONS[0].value}
                    render={({ field }) => (
                        <Select
                            className="select"
                            classNamePrefix="react-select"
                            options={STATE_OPTIONS}
                            defaultValue={STATE_OPTIONS[0]}
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
                name="department"
                defaultValue={DEPT_OPTIONS[0].value}
                render={({ field }) => (
                    <Select
                        className="select"
                        classNamePrefix="react-select"
                        options={DEPT_OPTIONS}
                        defaultValue={DEPT_OPTIONS[0]}
                        onChange={(state) => field.onChange(state?.value)}
                    />
                )}
            />
            <input type="submit" value="Save" />
        </form>
    );
};
