import styles from "./AddWord.module.css";

function Combo(props) {
    const { data, name, name_value, values } = props;

    const handleChange = (e) => {
        values[1]({ ...values[0], [name]: e.target.value });
    };

    let newData = [
        {
            id: 0,
            [name_value]: `Selecciona ${name_value}`,
        },
        ...data,
    ];

    const Combos = () => {
        return (
            <>
                <div className={styles.select}>
                    <select value={values[0][name]} onChange={handleChange}>
                        {newData.map((row, index) => {
                            return (
                                <LlenarCombo
                                    row={row}
                                    key={index}
                                    name_value={name_value}
                                />
                            );
                        })}
                    </select>
                </div>
            </>
        );
    };

    return <Combos />;
}

const LlenarCombo = ({ row, name_value }) => {
    return (
        <option className={styles.opc} value={row.id}>
            {row[name_value]}
        </option>
    );
};

export default Combo;
