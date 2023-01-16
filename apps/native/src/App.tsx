import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "ui";
import React, { useState } from "react";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { api, TRPCProvider } from "./utils/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { environment } from "./utils/environment";

// @TODO move all storyblok related types to one place (shared library?)
export interface Mark {
  type: string;
}

export interface Content3 {
  text: string;
  type: string;
  marks: Mark[];
}

export interface Content2 {
  type: string;
  content: Content3[];
}

export interface Description {
  type: string;
  content: Content2[];
}

export interface Task {
  type: string;
  content: Content2[];
}

export interface Row {
  _uid: string;
  task: Task;
  component: string;
  description: Description;
  nominalDays: string;
  optimisticDays: string;
  pessimisticDays: string;
  _editable: string;
}

export interface Section {
  _uid: string;
  rows: Row[];
  title: string;
  component: string;
  _editable: string;
}

export interface Content {
  _uid: string;
  title: string;
  sections: Section[];
  component: string;
  _editable: string;
}

export interface Story {
  name: string;
  created_at: Date;
  published_at: Date;
  id: number;
  uuid: string;
  content: Content;
  slug: string;
  full_slug: string;
  sort_by_date?: any;
  position: number;
  tag_list: any[];
  is_startpage: boolean;
  parent_id: number;
  meta_data?: any;
  group_id: string;
  first_published_at: Date;
  release_id?: any;
  lang: string;
  path?: any;
  alternates: any[];
  default_full_slug?: any;
  translated_slugs?: any;
}

export interface StoryResponse {
  story: Story;
}

function EstimationsView() {
  const testQuery = api.estimations.testQuery.useQuery();

  // @TODO use something that uses react-query
  const [storyResponse, setStoryResponse] = useState<StoryResponse | null>();

  const generateEstimation = async () => {
    const res = await fetch(`${environment.API_URL}/estimations`, {
      headers: { authorization: "temporary-secret-for-testing-purposes" },
    });

    const json = await res.json();

    setStoryResponse(json);
  };

  const removeEstimation = () => {
    setStoryResponse(null);
  };

  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Native</Text>
            <Text>
              {testQuery.data?.data ? testQuery.data.data : "Loading..."}
            </Text>
            <Button onClick={generateEstimation} text="Generate estimation" />
            <View style={{ marginTop: 8 }} />
            <Button onClick={removeEstimation} text="Remove estimation" />
            {storyResponse && <Estimation estimation={storyResponse.story} />}
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const Estimation: React.FC<{ estimation: Story }> = ({ estimation }) => {
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

const EstimationRow: React.FC<{ row: Row }> = ({ row }) => {
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
