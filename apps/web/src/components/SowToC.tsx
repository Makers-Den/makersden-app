import { sentenceToId } from "@md/client-logic";
import { Box, Flex, Link, VStack } from "native-base";
import React from "react";

export interface SoWToCEntry {
  level?: number;
  text?: string;
}

interface GroupedSowTocEntry {
  text: string;
  children: string[];
}

export interface SowTocProps {
  entries: SoWToCEntry[];
}

const groupEntries = (entries: SoWToCEntry[]): GroupedSowTocEntry[] => {
  const grouped: GroupedSowTocEntry[] = [];

  entries.forEach((entry) => {
    if (entry.level === 2) {
      grouped.push({ text: entry.text, children: [] });
    } else {
      grouped[grouped.length - 1].children.push(entry.text);
    }
  });

  return grouped;
};

export const SowToC = ({ entries }: SowTocProps) => {
  const groupedEntries = groupEntries(entries);

  return (
    <div style={{ pageBreakAfter: "always" }}>
      <VStack>
        {groupedEntries.map((groupedEntry, i) => (
          <Box my="1" key={i}>
            <Flex direction="row">
              <Link
                _text={{
                  color: "purple.400",
                  textDecoration: "underline",
                  fontSize: "md",
                  fontWeight: "bold",
                }}
                href={`#${sentenceToId(groupedEntry.text ?? "")}`}
              >
                {groupedEntry.text}
              </Link>
            </Flex>

            {groupedEntry.children.length > 0 && (
              <Box ml="8">
                {groupedEntry.children.map((groupedEntryChild, i) => (
                  <Flex key={i} direction="row">
                    <Link
                      _text={{
                        color: "purple.400",
                        textDecoration: "underline",
                        fontSize: "md",
                        fontWeight: "normal",
                      }}
                      href={`#${sentenceToId(groupedEntryChild)}`}
                    >
                      {groupedEntryChild}
                    </Link>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </div>
  );
};
