import React from "react";

function ComboBox({
    data = [],
    actuactualValue = "",
    placeholder = "",
    itemName = "",
    itemText = "",
    itemId = "",
    itemType = "",
    onChange = () => {},
}) {
    const [visible, setVisible] = useState(false);

    const changeVisibleState = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    return (
        <div>
            <h1>
                {itemType}
                {actuactualValue}
            </h1>
            <button onClick={changeVisibleState}>{placeholder}</button>
            {visible &&
                data.map((item, index) => {
                    return (
                        <div
                            key={item[itemId]}
                            onClick={onChange(
                                itemName,
                                item[itemId],
                                item[itemText]
                            )}
                        >
                            <p>{item[itemText]}</p>
                        </div>
                    );
                })}
        </div>
    );
}

export default ComboBox;
