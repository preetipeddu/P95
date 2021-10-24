import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Home from "../screens/Home";
import AddVolunteerHours from "../screens/AddVolunteerHours";
import VolunteerHistory from "../screens/VolunteerHistory";
import LogOut from "../screens/LogOut";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = {Home} />
            <Drawer.Screen name = "Add Volunteer Hours" component = {AddVolunteerHours} />
            <Drawer.Screen name = "Volunteer History" component = {VolunteerHistory} />
            <Drawer.Screen name = "Log-Out" component = {LogOut} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;