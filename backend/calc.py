import requests
from bs4 import BeautifulSoup
import re

class Calc:
    def __init__(self, from_stop, to_stop):
        self.from_stop = from_stop
        self.to_stop = to_stop

    def __remove_meta(self, str):
        return re.sub("[\r\n\t\xa0]", "", str)

    def getRes(self) -> dict:
        if not self.from_stop or not self.to_stop: return {}

        payload = {"from": self.from_stop, "to": self.to_stop, "locale": "ja"}
        r = requests.get("https://hakobus.bus-navigation.jp/wgsys/wgs/bus.htm", params=payload)
        soup = BeautifulSoup(r.text, "lxml")

        routes = []
        for box in soup.find_all("div", class_="route_box"):
            tds = box.find_all("td")
            route = {
                "line": tds[0].text,
                "line_description": ", ".join([tds[2].text, tds[3].text]),
                "duration": tds[4].text,
                "estimated_time_departure": tds[7].text,
                "estimated_time_arrival": tds[10].text,
                "predicted_time_departure": tds[11].text,
                "predicted_time_arrival": tds[8].text,
            }
            route = dict([(k, self.__remove_meta(v)) for k,v in route.items()])
            for v in route:
                if "line_description" == v: route[v] = re.sub("車種：.*$", "", route[v])
                if "duration" == v: route[v] = re.sub("所要時間： ", "", route[v])
                if "time" in v: route[v] = re.search("\d{1,2}:\d{1,2}", route[v]).group()
            routes.append(route)

        return {"routes": routes}