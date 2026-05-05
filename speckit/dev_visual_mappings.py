"""Development-only visual mapping contract for the wedding-site route/story flow.

This module intentionally contains configuration + validation helpers only so a
frontend can consume a stable, deterministic mapping source during early UI
construction. It must be easy to replace when final art direction is ready.
"""

from __future__ import annotations

from typing import Dict, Iterable, List

TEMPORARY_VISUAL_MODE = True

PAGE_COLOR_MAPPINGS: List[Dict[str, object]] = [
    {"key": "root", "routes": ["/"], "backgroundToken": "neutral-light", "temporary": True},
    {"key": "story", "routes": ["/en/story", "/it/story"], "backgroundToken": "green", "temporary": True},
    {
        "key": "sheSaidYes",
        "routes": ["/en/she-said-yes", "/it/she-said-yes"],
        "backgroundToken": "pink",
        "temporary": True,
    },
    {"key": "where", "routes": ["/en/where", "/it/where"], "backgroundToken": "blue", "temporary": True},
    {
        "key": "comingFromAbroad",
        "routes": ["/en/coming-from-abroad", "/it/coming-from-abroad"],
        "backgroundToken": "orange",
        "temporary": True,
    },
    {
        "key": "travellingFromLondon",
        "routes": ["/en/travelling-from-london", "/it/travelling-from-london"],
        "backgroundToken": "purple",
        "temporary": True,
    },
    {
        "key": "whereToStay",
        "routes": ["/en/where-to-stay", "/it/where-to-stay"],
        "backgroundToken": "yellow",
        "temporary": True,
    },
    {"key": "rsvp", "routes": ["/en/rsvp", "/it/rsvp"], "backgroundToken": "red", "temporary": True},
]

STORY_STEP_VISUAL_MAPPINGS: List[Dict[str, object]] = [
    {"order": 1, "stepId": "the-first-time", "backgroundToken": "step-1", "temporary": True},
    {"order": 2, "stepId": "it-was-10-am", "backgroundToken": "step-2", "temporary": True},
    {"order": 3, "stepId": "facing-the-morning", "backgroundToken": "step-3", "temporary": True},
    {"order": 4, "stepId": "flatmates", "backgroundToken": "step-4", "temporary": True},
    {"order": 5, "stepId": "ready-wall-of-shame", "backgroundToken": "step-5", "temporary": True},
    {"order": 6, "stepId": "who-are-you", "backgroundToken": "step-6", "temporary": True},
    {"order": 7, "stepId": "your-new-flatmate", "backgroundToken": "step-7", "temporary": True},
    {"order": 8, "stepId": "she-was-not-wrong", "backgroundToken": "step-8", "temporary": True},
    {"order": 9, "stepId": "bike", "backgroundToken": "step-9", "temporary": True},
    {"order": 10, "stepId": "pum", "backgroundToken": "step-10", "temporary": True},
]

_REQUIRED_ROUTES = {
    "/",
    "/en/story",
    "/it/story",
    "/en/she-said-yes",
    "/it/she-said-yes",
    "/en/where",
    "/it/where",
    "/en/coming-from-abroad",
    "/it/coming-from-abroad",
    "/en/travelling-from-london",
    "/it/travelling-from-london",
    "/en/where-to-stay",
    "/it/where-to-stay",
    "/en/rsvp",
    "/it/rsvp",
}


def _route_pair(route: str) -> str | None:
    if route.startswith("/en/"):
        return route.replace("/en/", "/it/", 1)
    if route.startswith("/it/"):
        return route.replace("/it/", "/en/", 1)
    return None


def validate_page_color_mappings(mappings: Iterable[Dict[str, object]]) -> None:
    seen_routes: Dict[str, str] = {}
    key_to_token: Dict[str, str] = {}

    for mapping in mappings:
        key = str(mapping["key"])
        token = str(mapping["backgroundToken"])
        routes = list(mapping["routes"])

        key_to_token[key] = token

        for route in routes:
            route = str(route)
            if route in seen_routes:
                raise ValueError(f"duplicate route mapping: {route}")
            seen_routes[route] = key

    if set(seen_routes) != _REQUIRED_ROUTES:
        missing = sorted(_REQUIRED_ROUTES.difference(seen_routes))
        extra = sorted(set(seen_routes).difference(_REQUIRED_ROUTES))
        raise ValueError(f"route coverage mismatch. missing={missing} extra={extra}")

    for route, key in seen_routes.items():
        pair = _route_pair(route)
        if pair is None:
            continue
        pair_key = seen_routes.get(pair)
        if pair_key is None:
            raise ValueError(f"localized pair missing for route {route}")
        if key_to_token[key] != key_to_token[pair_key]:
            raise ValueError(f"localized pair token mismatch: {route} vs {pair}")


def validate_story_step_mappings(mappings: Iterable[Dict[str, object]]) -> None:
    rows = list(mappings)
    if len(rows) != 10:
        raise ValueError("story mappings must contain exactly 10 rows")

    orders = sorted(int(row["order"]) for row in rows)
    if orders != list(range(1, 11)):
        raise ValueError("story orders must be contiguous from 1 to 10")

    step_ids = [str(row["stepId"]) for row in rows]
    if len(step_ids) != len(set(step_ids)):
        raise ValueError("step ids must be unique")

    ordered_rows = sorted(rows, key=lambda row: int(row["order"]))
    for left, right in zip(ordered_rows, ordered_rows[1:]):
        if left["backgroundToken"] == right["backgroundToken"]:
            raise ValueError("adjacent steps must have distinct background tokens")


def get_route_color(route: str) -> str:
    for mapping in PAGE_COLOR_MAPPINGS:
        if route in mapping["routes"]:
            return str(mapping["backgroundToken"])
    raise KeyError(f"no mapping for route: {route}")


def get_story_step_color(step_id: str) -> str:
    for mapping in STORY_STEP_VISUAL_MAPPINGS:
        if mapping["stepId"] == step_id:
            return str(mapping["backgroundToken"])
    raise KeyError(f"no mapping for story step: {step_id}")


validate_page_color_mappings(PAGE_COLOR_MAPPINGS)
validate_story_step_mappings(STORY_STEP_VISUAL_MAPPINGS)
