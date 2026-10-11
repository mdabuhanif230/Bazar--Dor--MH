"use client";

import { Select, Label, ListBox } from "@heroui/react";

export default function SortDropdown({ value, onChange }) {
    return (
        <Select
            value={value}
            onChange={onChange}
            className="flex flex-row items-center gap-2.5 text-xs whitespace-nowrap max-[540px]:w-full max-[540px]:justify-between"
        >
            <Label className="text-xs">
                সাজান:
            </Label>

            <Select.Trigger className="h-8 min-h-8 w-[185px] rounded-sm border border-[#e4ece6] bg-white px-3 text-xs shadow-none">
                <Select.Value className="text-xs" />
                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover className="rounded-md border border-[#e4ece6] bg-white">
                <ListBox>
                    <ListBox.Item id="default" textValue="ডিফল্ট">
                        ডিফল্ট
                        <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="low" textValue="দাম: কম থেকে বেশি">
                        দাম: কম থেকে বেশি
                        <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="high" textValue="দাম: বেশি থেকে কম">
                        দাম: বেশি থেকে কম
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    );
}