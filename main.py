import json
import os
import eel

# Uträknings mängd räknare
utraknings_mangd = 0

eel.init("web")

def las_data() -> dict:
    with open("data.json", "r") as fil:
        content = json.loads(fil.read())
    return content

def skriv_data(content: dict) -> dict:
    with open("data.json", "w") as fil:
        fil.write(json.dumps(content))
    return content

# Dekoratorn avslöjar funktionen för Javascript koden
@eel.expose
def skapa_utrakning(tal: int):
    global utraknings_mangd

    ny_utrakning = {
        "id": utraknings_mangd + 1,
        "tal": tal,
    }

    content = las_data()
    content['utrakningar'].append(ny_utrakning)

    skriv_data(content)

    utraknings_mangd += 1
    return ny_utrakning

# Dekoratorn avslöjar funktionen för Javascript koden
@eel.expose
def lista_utrakningar() -> None:
    return las_data()

# Dekoratorn avslöjar funktionen för Javascript koden
@eel.expose
def radera_utrakning(id: int) -> None:
    global utraknings_mangd

    content = las_data()

    index_to_remove = next((index for (index, d) in enumerate(content['utrakningar']) if d['id'] == id), None)

    if index_to_remove is not None:
        content['utrakningar'].pop(index_to_remove)

    skriv_data(content)
    utraknings_mangd -= 1

def setup() -> None:
    if not os.path.exists("data.json"):
        with open("data.json", "w") as fil:
            fil.write(json.dumps({"utrakningar": []}))
    else:
        content = las_data()
        utraknings_mangd = len(content['utrakningar'])

setup()

eel.start("index.html")