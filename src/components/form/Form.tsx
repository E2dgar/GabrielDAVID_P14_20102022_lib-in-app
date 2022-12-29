import './index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Error } from '../atoms/error';

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
    birth: Date;
    startDate: Date;
}
interface EmployeeData extends Inputs {
    birth: Date | string;
    startDate: Date | string;
}

export const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm<InputsForm>();

    const watchBirth = watch('birth', undefined);
    const watchStartDate = watch('startDate', undefined);

    const onSubmit: SubmitHandler<InputsForm> = (data) => {
        let formatedData: EmployeeData = { ...data };

        formatedData.birth = data.birth.toString();
        formatedData.startDate = data.startDate.toString();

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
                        name="birth"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Birth date"
                                onChange={(date: Date) => field.onChange(date)}
                                selected={field.value}
                            />
                        )}
                    />
                    {errors.birth && <Error />}
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
                            options={options}
                            defaultValue={options[0]}
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
                        options={options}
                        defaultValue={options[0]}
                        onChange={(state) => field.onChange(state?.value)}
                    />
                )}
            />
            <input type="submit" value="Save" />
        </form>
    );
};
