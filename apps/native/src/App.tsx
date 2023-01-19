import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, EstimationDetails } from "ui";
import React, { useState } from "react";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { api, TRPCProvider } from "./utils/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ISbStoryData } from "storyblok-js-client";
import {
  EstimationContent,
  EstimationSectionRowContent,
} from "storyblok-types";

function EstimationsView() {
  const [estimation, setEstimation] =
    useState<ISbStoryData<EstimationContent> | null>();
  const { mutate: createEstimationFromSheet } =
    api.estimations.createFromSheet.useMutation();

  const generateEstimation = async () => {
    createEstimationFromSheet(undefined, {
      onSuccess: (data) => {
        if (data.isError === true) {
          // @TODO proper error handling;
          console.log(data);
          return;
        }

        setEstimation(data.estimation);
      },
    });
  };

  const removeEstimation = () => {
    setEstimation(null);
  };

  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Native</Text>
            <EstimationDetails />
            <Button onClick={generateEstimation} text="Generate estimation" />
            <View style={{ marginTop: 8 }} />
            <Button onClick={removeEstimation} text="Remove estimation" />
            {estimation && <Estimation estimation={estimation} />}
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const Estimation: React.FC<{ estimation: ISbStoryData<EstimationContent> }> = ({
  estimation,
}) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontWeight: "bold" }}>
        Estimation: {estimation.content.title}
      </Text>
      <View>
        {estimation.content.sections.map((section) => (
          <View key={section._uid} style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Section: {section.title}</Text>
            <View style={{ marginTop: 4 }}>
              {section.rows.map((row) => (
                <EstimationRow key={row._uid} row={row} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const EstimationRow: React.FC<{ row: EstimationSectionRowContent }> = ({
  row,
}) => {
  const expectedDays =
    (+row.pessimisticDays + 4 * +row.nominalDays + +row.optimisticDays) / 6;

  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Task: </Text>
        {row.task.content.map((c) => (
          <Text key={c.content[0]?.text}>{c.content[0]?.text}</Text>
        ))}
      </View>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Description: </Text>
        <Text>
          {row.description.content.map((c) => (
            <Text key={c.content[0]?.text}>{c.content[0]?.text}</Text>
          ))}
        </Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Optimistic days</Text>
        <Text>{row.optimisticDays}</Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Nominal days</Text>
        <Text>{row.nominalDays}</Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Pessimistic days</Text>
        <Text>{row.pessimisticDays}</Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Expected days</Text>
        <Text>{expectedDays}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});

export default function () {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <EstimationsView />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
