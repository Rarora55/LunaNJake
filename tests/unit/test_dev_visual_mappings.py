# BSD 3-Clause License

# Copyright (c) 2025, Miguel Dovale (University of Arizona),
# Gerhard Heinzel (Albert Einstein Institute).

# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:

# 1. Redistributions of source code must retain the above copyright notice, this
#    list of conditions and the following disclaimer.

# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.

# 3. Neither the name of the copyright holder nor the names of its
#    contributors may be used to endorse or promote products derived from
#    this software without specific prior written permission.

# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
# FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
# DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
# OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# This software may be subject to U.S. export control laws. By accepting this
# software, the user agrees to comply with all applicable U.S. export laws and
# regulations. User has the responsibility to obtain export licenses, or other
# export authority as may be required before exporting such information to
# foreign countries or providing access to foreign persons.
#
import pytest

from speckit.dev_visual_mappings import (
    PAGE_COLOR_MAPPINGS,
    STORY_STEP_VISUAL_MAPPINGS,
    TEMPORARY_VISUAL_MODE,
    get_route_color,
    get_story_step_color,
    validate_page_color_mappings,
    validate_story_step_mappings,
)


def test_route_mapping_covers_required_routes_and_values():
    expected = {
        "/": "neutral-light",
        "/en/story": "green",
        "/it/story": "green",
        "/en/she-said-yes": "pink",
        "/it/she-said-yes": "pink",
        "/en/where": "blue",
        "/it/where": "blue",
        "/en/coming-from-abroad": "orange",
        "/it/coming-from-abroad": "orange",
        "/en/travelling-from-london": "purple",
        "/it/travelling-from-london": "purple",
        "/en/where-to-stay": "yellow",
        "/it/where-to-stay": "yellow",
        "/en/rsvp": "red",
        "/it/rsvp": "red",
    }
    for route, token in expected.items():
        assert get_route_color(route) == token


def test_route_validation_rejects_duplicate_route():
    broken = [dict(x) for x in PAGE_COLOR_MAPPINGS]
    broken[0] = dict(broken[0])
    broken[0]["routes"] = ["/", "/en/story"]
    with pytest.raises(ValueError, match="duplicate route mapping"):
        validate_page_color_mappings(broken)


def test_route_lookup_rejects_unknown_route():
    with pytest.raises(KeyError):
        get_route_color("/en/not-real")


def test_story_steps_are_ten_and_contiguous():
    validate_story_step_mappings(STORY_STEP_VISUAL_MAPPINGS)
    assert len(STORY_STEP_VISUAL_MAPPINGS) == 10
    assert sorted(int(x["order"]) for x in STORY_STEP_VISUAL_MAPPINGS) == list(range(1, 11))


def test_story_step_lookup_and_adjacent_distinction():
    assert get_story_step_color("the-first-time") == "step-1"
    assert get_story_step_color("pum") == "step-10"

    ordered = sorted(STORY_STEP_VISUAL_MAPPINGS, key=lambda row: int(row["order"]))
    for left, right in zip(ordered, ordered[1:]):
        assert left["backgroundToken"] != right["backgroundToken"]


def test_story_step_validation_rejects_bad_rows():
    broken = [dict(x) for x in STORY_STEP_VISUAL_MAPPINGS[:-1]]
    with pytest.raises(ValueError, match="exactly 10"):
        validate_story_step_mappings(broken)


def test_story_step_lookup_rejects_unknown_step():
    with pytest.raises(KeyError):
        get_story_step_color("unknown-step")


def test_temporary_scope_marker_present():
    assert TEMPORARY_VISUAL_MODE is True
