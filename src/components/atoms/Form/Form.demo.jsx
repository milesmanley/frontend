import React, {useState} from "react"
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import Form from "./Form";
import NumberInput from "./NumberInput";
import Submit, {Button} from "./Submit";
import {jsonify} from "../../../lib/helpers/strings";
import {min,max,required} from "./validation";
import {x} from "@xstyled/styled-components";
import SelectInput from "./SelectInput";
import {model} from "./helpers";
import TextInput from "./TextInput";

const FormDemo = () => {
    const [number, setNumber] = useState(1)
    const [select, setSelect] = useState("ETH")
    const [text, setText] = useState("")
    const { t } = useTranslation();
  return <>
    <Form
      initialValues={{
        uncontrolledNumber: "",
        controlled: number,
        select: "ETH",
        controlledSelect: "ETH"
      }}
      onSubmit={async (data, resetForm) => {
        alert(jsonify(data))
        resetForm()
      }}>
      <x.div>
        <NumberInput
          label={"Number Input"}
          name={"uncontrolledNumber"}
          validate={[min(0), required]}
          block
        />
        <x.div row>
          <x.div col>
            <NumberInput
              block
              label={"Controlled Number Input"}
              name={"controlled"}
              validate={[max(2), min(-1)]}
              {...model(number, setNumber)}
            />
          </x.div>
          <x.div col display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button variant={"secondary"} onClick={() => setNumber(number + 1)}>
              {t("change_controlled")}
            </Button>
          </x.div>
        </x.div>
      </x.div>

      <x.div mt={8}>
        <SelectInput
          label={"Select Input"}
          name={"select"}
          block
          items={[{name: "MANA", id: "MANA"}, {name: "USDT", id: "USDT"}]}
        />
        <x.div row>
          <x.div col>
            <SelectInput
              label={"Controlled Select Input"}
              name={"controlledSelect"}
              items={[{name: "ETH", id: "ETH"}, {name: "USDC", id: "USDC"}]}
              {...model(select, setSelect)}
            />
          </x.div>
          <x.div col display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button variant={"secondary"} onClick={() => {
              if (select === "ETH") {
                setSelect("USDC")
              } else {
                setSelect("ETH")
              }
            }}>
              {t("change_controlled")}
            </Button>
          </x.div>
        </x.div>
      </x.div>

      <x.div mt={8}>
        <TextInput
          label={"Text Input"}
          name={"textMe"}
          block
        />
        <x.div row>
          <x.div col>
            <TextInput
              label={"Controlled Text Input"}
              name={"controlledTextInput"}
              {...model(text, setText)}
            />
          </x.div>
          <x.div col display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button variant={"secondary"} onClick={() => {
              setText((Math.random() + 1).toString(36).substring(7))
            }}>
              {t("set_controlled")}
            </Button>
          </x.div>
        </x.div>
      </x.div>

      <x.div mt={4}>
        <Submit block/>
      </x.div>
    </Form>
  </>
}

export default FormDemo
