import requests
from bs4 import BeautifulSoup
import json
import re

class Search:
    def __init__(self, stop):
        self.stop = stop

    def get_res(self):
        payload = {"term": self.stop, "language": "ja"}
        r = requests.post("https://hakobus.bus-navigation.jp/wgsys/wgs/fromsearch.htm", data=payload)
        return json.loads(r.text)


class Result:
    def __init__(self, from_stop, to_stop):
        self.from_stop = from_stop
        self.to_stop = to_stop

    def __remove_meta(self, key, value):
        value = re.sub("[\r\n\t\xa0]", "", value)
        if "line_description" == key: value = re.sub("車種：.*$", "", value)
        if "duration" == key: value = re.sub("^所要時間： ", "", value)
        if "time" in key: value = re.sub("^(予定|発車|到着)(時刻|予測) ", "", value)
        return value


    def get_res(self) -> dict:
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
            route = dict([(k, self.__remove_meta(k,v)) for k,v in route.items()])
            routes.append(route)

        return routes
