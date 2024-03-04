import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { ListItem, Icon } from '@rneui/themed';

const SelectBox = ({
    value,
    placeholder,
    data,
    boxStyle,
    inputStyle,
    dropdownStyle,
    dropdownItemStyle,
    dropdownTextStyle
}) => {

const [showSelectBox, setSelectBox] = useState(false)
  return (
    <View style={[{backgroundColor: "#fff", color: "#fff", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}, boxStyle]}>
                                <TouchableOpacity style={[{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}, inputStyle]} onPress={() => {
                    setSelectBox(!showSelectBox);
                }}>
                                    {
                                        value !== "" ? (
                                            <>
                                                <Text>{value}</Text>
                                                <Icon type='ionicon' name='chevron-down-outline' size={14} />
                                            </>
                                        ) : (
                                            <>
                                                <Text>{placeholder}</Text>
                                                <Icon type='ionicon' name='chevron-down-outline' size={14} />
                                            </>
                                        )
                                    }

                                </TouchableOpacity>

                                <ScrollView
                                 style={[{ maxHeight: 100}, dropdownStyle ]} >
                                    {
                                        showSelectBox && (
                                            <>
                                                <View style={{marginVertical: 10}}>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[dropdownItemStyle]} onPress={() => {setBenefit("Option 1"); setSelectBox(!showSelectBox); }}>
                                                        <Text style={dropdownTextStyle}>Option 1</Text>
                                                    </TouchableOpacity>
                                                    
                                                </View>
                                            </>
                                        )
                                    }
                                </ScrollView>
                                
                            </View>
  )
}

export default SelectBox