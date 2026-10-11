"use client";

export default function SortDropdown({ value, onChange }) {
    function handleChange(event) {
        onChange(event.target.value);
    }

    return (
        <label
            className="sort-label"
            htmlFor="product-sort"
        >
            সাজান:

            <select
                id="product-sort"
                className="select select-sm"
                value={value}
                onChange={handleChange}
            >
                <option value="default">
                    ডিফল্ট
                </option>

                <option value="low">
                    দাম: কম থেকে বেশি
                </option>

                <option value="high">
                    দাম: বেশি থেকে কম
                </option>
            </select>
        </label>
    );
}