import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const MatchingPairsTable = ({ matchingPairs, currentMatchingPairsPage, matchingPairsPerPage }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pattern</TableCell>
          <TableCell>Log Message</TableCell>
          <TableCell>Jira Ticket</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matchingPairs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} align="center">
              No data generated yet.
            </TableCell>
          </TableRow>
        ) : (
          matchingPairs
            .slice(
              (currentMatchingPairsPage - 1) * matchingPairsPerPage,
              currentMatchingPairsPage * matchingPairsPerPage
            )
            .map((pair, index) => (
              <TableRow key={index}>
                <TableCell>{pair.pattern}</TableCell>
                <TableCell>{pair.logMessage}</TableCell>
                <TableCell>
                  {pair.ticketjira && (
                    <a
                      href={pair.ticketjira}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pair.ticketjira}
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export default MatchingPairsTable;
