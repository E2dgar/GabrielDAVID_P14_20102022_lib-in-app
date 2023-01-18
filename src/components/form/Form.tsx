import './index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { ErrorForm } from '../atoms/error';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addEntrie } from '../../redux/reducers/employeesSlice';
import { formatDate } from '../../helpers';
import {
    STATE_OPTIONS,
    DEPT_OPTIONS,
    MODAL_MSG
} from '../../constants/content';

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
    openModal: (msg: string) => void;
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
        let formatedData: EmployeeData = { ...data };

        formatedData.dateOfBirth = formatDate(data.dateOfBirth);
        formatedData.startDate = formatDate(data.startDate);

        try {
            dispatch(addEntrie(formatedData));
            openModal(MODAL_MSG.success);
        } catch (error) {
            console.log(error);
            openModal(MODAL_MSG.failed);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="sr-only">First Name</label>
            <input
                {...register('firstName', { required: true })}
                placeholder="First Name"
            />
            {errors.firstName && <ErrorForm />}

            <label className="sr-only">Last Name</label>
            <input
                {...register('lastName', { required: true })}
                placeholder="Last Name"
            />
            {errors.lastName && <ErrorForm />}

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
                    {errors.dateOfBirth && <ErrorForm />}
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
                    {errors.startDate && <ErrorForm />}
                </div>
            </div>

            <fieldset>
                <legend>Address</legend>
                <label className="sr-only" htmlFor="street">
                    Street
                </label>
                <input
                    {...register('street', { required: true })}
                    placeholder="Street"
                    id="street"
                />
                {errors.street && <ErrorForm />}

                <label className="sr-only" htmlFor="city">
                    City
                </label>
                <input
                    {...register('city', { required: true })}
                    placeholder="City"
                    id="city"
                />
                {errors.city && <ErrorForm />}

                <label id="state-label" htmlFor="state">
                    State
                </label>
                <Controller
                    control={control}
                    name="state"
                    defaultValue={STATE_OPTIONS[0].value}
                    render={({ field }) => (
                        <Select
                            aria-labelledby='"state-label'
                            inputId="state"
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
                {errors.zipCode && <ErrorForm />}
            </fieldset>

            <label id="dept-label" htmlFor="dept">
                Department
            </label>
            <Controller
                control={control}
                name="department"
                defaultValue={DEPT_OPTIONS[0].value}
                render={({ field }) => (
                    <Select
                        aria-labelledby='"dept-label'
                        inputId="dept"
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
