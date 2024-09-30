import {
  Box,
  Card,
  CardContent,
  Container,
  Link,
  Typography,
} from "@mui/material";
import LinkBehavior from "../components/LinkBehavior";

export default function Impressum() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h3">Impressum</Typography>
          <Link component={LinkBehavior} href="/">
            zurück
          </Link>
        </Box>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Herausgeber
            </Typography>
            <Typography gutterBottom>
              Philipp Jardas
              <br />
              Keltenweg 13
              <br />
              63571 Gelnhausen
            </Typography>
            <Typography>
              E-Mail:{" "}
              <Link href="mailto:philipp@jardas.de">philipp@jardas.de</Link>
              <br />
              Telefon: <Link href="tel:+4917623166442">0176 23166442</Link>
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Haftungshinweis
            </Typography>
            <Typography>
              Die Informationen dieser Website sind mit größter Sorgfalt
              zusammengestellt und werden ständig aktualisiert. Die MEDICLIN
              übernimmt jedoch keine Gewähr für Richtigkeit und Vollständigkeit.
              Für die Inhalte verlinkter externer Seiten sind ausschließlich
              deren Betreiber verantwortlich.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Datenschutzerklärung
            </Typography>
            <Typography gutterBottom>
              Die EU-Datenschutz-Grundverordnung (DSGVO), in Kraft getreten am
              25. Mai 2018, verpflichtet uns, Sie umfassend über die
              Verarbeitung Ihrer personenbezogenen Daten zu informieren. Unter
              anderem informieren wir Sie ausführlich über Ihre Rechte als
              „Betroffene“, deren personenbezogene Daten wir verarbeiten.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Welche Daten erfassen wir von Ihnen?
            </Typography>
            <Typography gutterBottom>
              Teil des Angebots ist die altersabhängige Berechnung der
              Gültigkeitsdauer der Untersuchung nach G26.3. Hierzu wird das
              Geburtsdatum der betroffenen Person benötigt. Dieses wird,
              zusammen mit den Daten der anderen Voraussetzungen wie
              Streckendurchgang, Unterweisung und Einsatz/Übung, anonymisiert in
              einer Datenbank abgelegt. Anonymisiert bedeutet, dass die Daten
              lediglich mit einem technischen Schlüssel versehen werden, und
              keine Möglichkeit besteht, diese einer konkreten Person
              zuzuordnen.
            </Typography>
            <Typography gutterBottom>
              Es werden keine weiteren Daten erhoben.
            </Typography>
            <Typography gutterBottom>
              Wir nutzen die erhobenen Daten ausschließlich zur Bereitstellung,
              Optimierung und Sicherheit unseres Internetangebots.
            </Typography>
            <Typography gutterBottom>
              Wir nutzen Ihre Daten nicht zur Profilbildung oder für Werbung.
            </Typography>
            <Typography>
              Sie haben das Recht auf Auskunft, Löschung und Berichtigung der
              erhobenen Daten sowie auf Widerspruch gegen die Erhebung der
              Daten. Bitte wenden Sie sich hierfür an den oben angegebenen
              Herausgeber, der auch als Datenschutzbeauftragter fungiert.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
