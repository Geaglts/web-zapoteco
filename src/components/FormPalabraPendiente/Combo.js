import styles from "./AddWord.module.css";
import React, { useState } from "react";

function Combo(props) {
    const { data, text, name, name_value, values } = props;
    // const [value, setValue] = useState(data[0].value);

    const handleChange = (e) => {
        values[1]({ ...values[0], [name]: parseInt(e.target.value) });
    };

    const LlenarCombo = ({ row }) => {
        return (<option className={styles.opc} value={row.id}>{row[name_value]}</option>);
    };

    // console.log(values?.categ);

    const Combos = () => {
        const rows = data.map((row, index) => {
            return <LlenarCombo row={row} key={index} />;
        });
        return (
            <>
                {/* <label>{text}</label> */}
                <div className={styles.select}>
                    <select value={values[0][name]} onChange={handleChange}>
                        {rows}
                    </select>
                </div>
            </>
        );
    };

    return <Combos />;
}

export default Combo;
